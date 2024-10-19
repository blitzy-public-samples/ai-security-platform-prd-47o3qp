###############################################################################
# Terraform configuration for setting up a PostgreSQL database instance within #
# the infrastructure.                                                         #
#                                                                              #
# Addresses the following requirements:                                        #
# - TR-DM-011-1: "Utilize a relational database (e.g., PostgreSQL) for         #
#   structured data storage."                                                  #
#   Location: Technical Specification/4.11 Data Management                     #
# - TR-DM-011-3: "Implement data encryption at rest and in transit using       #
#   industry-standard protocols (e.g., AES-256, TLS 1.2+)."                    #
#   Location: Technical Specification/4.11 Data Management                     #
# - TR-DM-011-4: "Ensure data redundancy and replication across multiple data  #
#   centers for high availability."                                            #
#   Location: Technical Specification/4.11 Data Management                     #
# - TR-DM-011-5: "Develop automated backup and recovery procedures with        #
#   point-in-time recovery capabilities."                                      #
#   Location: Technical Specification/4.11 Data Management                     #
# - TR-DP-019-6: "Maintain secure data storage solutions with encryption and   #
#   access controls."                                                          #
#   Location: Technical Specification/4.19 Data Privacy                        #
###############################################################################

# AWS provider is configured in 'infrastructure/terraform/providers.tf'
# Module dependencies:
# - VPC settings from 'infrastructure/terraform/modules/network/vpc.tf'
# - Security groups from 'infrastructure/terraform/modules/network/security_groups.tf'
# - Variables are defined in 'infrastructure/terraform/variables.tf'

# Resource block for creating a PostgreSQL database instance
resource "aws_db_instance" "postgresql" {
  # Define the PostgreSQL instance class and allocated storage.
  # Utilizing variables for instance type and storage size.
  # Variables defined in 'variables.tf'
  instance_class      = var.postgresql_instance_type   # e.g., "db.t3.medium"
  allocated_storage   = var.postgresql_storage_size    # e.g., "20"

  # Specify the engine and engine version for PostgreSQL.
  engine              = "postgres"
  engine_version      = var.postgresql_engine_version  # e.g., "12.5"

  # Configure the database name, username, and password.
  name                = var.postgresql_db_name         # Database name
  username            = var.postgresql_username        # Master username
  password            = var.postgresql_password        # Master password (sensitive)

  # Associate the instance with the specified VPC and security groups.
  # Security group for database access control from 'security_groups' module.
  # VPC subnet group from 'vpc' module.
  vpc_security_group_ids = [module.security_groups.db_security_group_id]
  db_subnet_group_name   = module.vpc.db_subnet_group

  # Apply encryption settings as per compliance requirements.
  # Addresses TR-DM-011-3 and TR-DP-019-6 for data encryption at rest.
  storage_encrypted   = true                           # Enable encryption at rest
  kms_key_id          = var.kms_key_id                 # KMS Key for encryption

  # Apply backup settings as per compliance requirements.
  # Addresses TR-DM-011-5 for automated backup and recovery procedures.
  backup_retention_period = var.backup_retention_period  # e.g., "7" days
  backup_window           = var.backup_window            # e.g., "02:00-03:00"

  # Multi-AZ deployment for high availability.
  # Addresses TR-DM-011-4 for data redundancy and high availability.
  multi_az            = var.enable_multi_az            # true or false

  # Additional configurations for security and compliance.
  publicly_accessible = false                          # Database is not publicly accessible
  skip_final_snapshot = false                          # Create a final snapshot before deletion
  deletion_protection = true                           # Prevent accidental deletion

  # Enable performance insights for monitoring (optional).
  performance_insights_enabled = true
  performance_insights_retention_period = var.performance_insights_retention_period  # e.g., "7" days

  # Apply tags for resource identification.
  tags = {
    Environment = var.environment                      # e.g., "production", "staging"
    Name        = "postgresql-instance"
  }

  # Specify timeouts for create, update, and delete operations (optional).
  timeouts {
    create = "60m"
    update = "60m"
    delete = "60m"
  }
}

# Outputs
# Provides the endpoint URL for the PostgreSQL instance.
# Other modules and services can use this endpoint to connect to the database.
output "postgresql_endpoint" {
  description = "The endpoint URL for the PostgreSQL instance."
  value       = aws_db_instance.postgresql.endpoint
}

# Output for the database port
# Provides the port number for the PostgreSQL instance.
output "postgresql_port" {
  description = "The port number on which the PostgreSQL instance is listening."
  value       = aws_db_instance.postgresql.port
}

###############################################################################
# Notes for Junior Developers:
# - Ensure that all variables used (e.g., var.postgresql_instance_type) are    #
#   defined in 'variables.tf' with appropriate default values or are provided  #
#   via environment-specific variable files.                                   #
# - Sensitive variables like 'var.postgresql_password' should be handled       #
#   securely using Terraform's sensitive variable feature or secret management #
#   tools like AWS Secrets Manager.                                            #
# - The 'kms_key_id' for encryption should be managed securely and have the    #
#   necessary permissions for the RDS instance to access the KMS key.          #
# - Backup and maintenance windows should be scheduled according to the        #
#   organization's operational hours to minimize impact on users.              #
# - Multi-AZ deployments are recommended for production environments to ensure #
#   high availability and failover capabilities.                               #
# - Always adhere to the compliance requirements specified in the Technical    #
#   Specification to ensure data security and regulatory compliance.           #
# - For more details on the requirements addressed, refer to the Technical     #
#   Specification sections mentioned in the comments above.                    #
###############################################################################