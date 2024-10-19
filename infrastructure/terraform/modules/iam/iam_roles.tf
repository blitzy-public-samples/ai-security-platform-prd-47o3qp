# This Terraform configuration defines and manages IAM roles within the IAM module.
# These roles are used to manage permissions and access control for AWS resources,
# ensuring secure and compliant operations.

###############
# VARIABLES
###############

# Variable: role_name_prefix
# Defines the prefix for IAM role names.
variable "role_name_prefix" {
  description = "Prefix for the IAM role name."
  type        = string
  default     = "my-iam-role"
}

# Variable: assume_role_policy
# The policy that grants an entity permission to assume the role in JSON format.
# This is critical for security and compliance, ensuring that only authorized entities can assume this role.
# It must comply with the 'Security and Compliance' requirements (TR-SC-013) outlined in the Technical Requirements/Security and Compliance documentation.
variable "assume_role_policy" {
  description = "The JSON policy that grants an entity permission to assume the role."
  type        = string
}

# Variable: tags
# A map of tags to assign to the IAM role.
# Tags are important for resource identification, management, compliance, and cost allocation.
variable "tags" {
  description = "A map of tags to assign to the IAM role."
  type        = map(string)
  default     = {}
}

###############
# RESOURCE: aws_iam_role
###############

# Resource: aws_iam_role
# We are using the 'aws_iam_role' resource from the 'hashicorp/aws' provider (version >= 3.0.0) to define IAM roles.
resource "aws_iam_role" "main" {
  # Name: Constructs the IAM role name using the provided prefix and a suffix.
  # This naming convention ensures consistency and easier management of IAM roles.
  name = "${var.role_name_prefix}-primary"

  # Assume Role Policy: Specifies who can assume this role.
  # It is essential to define this policy carefully to prevent unauthorized access,
  # addressing the 'Security and Compliance' requirement (TR-SC-013) in the Technical Requirements.
  assume_role_policy = var.assume_role_policy

  # Tags: Assigns tags to the IAM role for resource identification and management.
  # Tags facilitate compliance with organizational policies and support cost allocation.
  tags = var.tags

  # Steps Accomplished:
  # - Created an IAM role with the specified name and assume role policy.
  # - Attached tags for resource identification and management.

  # Dependencies:
  # - This IAM role may be associated with the following internal modules:
  #   - Security Groups (infrastructure/terraform/modules/network/security_groups.tf)
  #     Purpose: Associates security groups with IAM roles for network access control.
  #   - VPC (infrastructure/terraform/modules/network/vpc.tf)
  #     Purpose: Provides the VPC configuration necessary for IAM roles' networking.
  #   - ECS Cluster (infrastructure/terraform/modules/compute/ecs_cluster.tf)
  #     Purpose: Defines ECS clusters that utilize IAM roles for permissions.
  #   - ECS Service (infrastructure/terraform/modules/compute/ecs_service.tf)
  #     Purpose: Associates IAM roles with ECS services for access control.
  #   - ALB (infrastructure/terraform/modules/load_balancer/alb.tf)
  #     Purpose: Integrates IAM roles with Application Load Balancers for traffic management.
  #   - S3 Buckets (infrastructure/terraform/modules/storage/s3_buckets.tf)
  #     Purpose: Defines IAM roles for managing permissions and access control to S3 buckets.

  # Requirements Addressed:
  # - Security and Compliance (Technical Requirements/Security and Compliance, TR-SC-013)
  #   Description: Ensures the platform is secure against unauthorized access, data breaches, and other security threats through robust authentication and authorization mechanisms.
}

###############
# OUTPUTS
###############

# Output: iam_role_arn
# Exposes the ARN (Amazon Resource Name) of the created IAM role.
# This output can be used by other modules and resources that require referencing this IAM role.
output "iam_role_arn" {
  description = "The ARN of the created IAM role."
  value       = aws_iam_role.main.arn
}