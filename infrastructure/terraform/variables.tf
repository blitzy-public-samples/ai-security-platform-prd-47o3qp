/*
Terraform Variable Definitions

This file defines the variables used across the Terraform configuration to allow for flexible and reusable infrastructure deployment.

Requirements Addressed:

- **Scalability and Performance** (*Technical Specification/1.1 System Objectives*): Enables dynamic configuration and scaling of resources to handle increasing data volumes and user bases without performance degradation.

Dependencies:

- **Internal Modules**:
  - mongodb (infrastructure/terraform/modules/database/mongodb.tf)
  - postgresql (infrastructure/terraform/modules/database/postgresql.tf)
  - security_groups (infrastructure/terraform/modules/network/security_groups.tf)
  - vpc (infrastructure/terraform/modules/network/vpc.tf)
  - ecs_cluster (infrastructure/terraform/modules/compute/ecs_cluster.tf)
  - ecs_service (infrastructure/terraform/modules/compute/ecs_service.tf)
  - alb (infrastructure/terraform/modules/load_balancer/alb.tf)
  - s3_buckets (infrastructure/terraform/modules/storage/s3_buckets.tf)
  - iam_roles (infrastructure/terraform/modules/iam/iam_roles.tf)
  - providers (infrastructure/terraform/providers.tf)
  - outputs (infrastructure/terraform/outputs.tf)

- **External Dependencies**:
  - AWS Provider (hashicorp/aws v>= 3.0.0): Terraform provider for managing AWS resources.
*/

/*
Variable: region
Description: The AWS region where the infrastructure will be deployed.
Used by: providers.tf, modules requiring AWS region.

Requirement Addressed:
- **Scalability and Performance** (*Technical Specification/1.1 System Objectives*): Allows deployment in specific AWS regions to optimize performance and meet compliance requirements.
*/
variable "region" {
  description = "The AWS region where the infrastructure will be deployed."
  type        = string
  default     = "us-west-2"
}

/*
Variable: mongodb_instance_type
Description: The instance type for the MongoDB database.
Used by: mongodb.tf

Requirement Addressed:
- **Scalability and Performance** (*Technical Specification/1.1 System Objectives*): Enables scaling of database resources to handle increasing data volumes.
*/
variable "mongodb_instance_type" {
  description = "The instance type for the MongoDB database."
  type        = string
  default     = "db.t3.medium"
}

/*
Variable: mongodb_storage_size
Description: The storage size for the MongoDB database in GB.
Used by: mongodb.tf

Requirement Addressed:
- **Scalability and Performance** (*Technical Specification/1.1 System Objectives*): Allows adjustment of storage capacity to accommodate growing data volumes.
*/
variable "mongodb_storage_size" {
  description = "The storage size for the MongoDB database in GB."
  type        = number
  default     = 20
}

/*
Variable: postgresql_instance_type
Description: The instance type for the PostgreSQL database.
Used by: postgresql.tf

Requirement Addressed:
- **Scalability and Performance** (*Technical Specification/1.1 System Objectives*): Enables scaling of database resources to manage increasing data volumes and user concurrency.
*/
variable "postgresql_instance_type" {
  description = "The instance type for the PostgreSQL database."
  type        = string
  default     = "db.t3.medium"
}

/*
Variable: postgresql_storage_size
Description: The storage size for the PostgreSQL database in GB.
Used by: postgresql.tf

Requirement Addressed:
- **Scalability and Performance** (*Technical Specification/1.1 System Objectives*): Allows adjustment of storage capacity to accommodate the growth of structured data.
*/
variable "postgresql_storage_size" {
  description = "The storage size for the PostgreSQL database in GB."
  type        = number
  default     = 20
}

/*
Variable: vpc_cidr_block
Description: The CIDR block for the VPC.
Used by: vpc.tf

Requirement Addressed:
- **Scalability and Performance** (*Technical Specification/1.1 System Objectives*): Defines network address space for scalable infrastructure and ensures adequate IP addresses for resources.
*/
variable "vpc_cidr_block" {
  description = "The CIDR block for the VPC."
  type        = string
  default     = "10.0.0.0/16"
}

/*
Variable: cluster_name
Description: The name of the ECS cluster.
Used by: ecs_cluster.tf

Requirement Addressed:
- **Scalability and Performance** (*Technical Specification/1.1 System Objectives*): Identifies the ECS cluster for scalable deployment of containerized applications.
*/
variable "cluster_name" {
  description = "The name of the ECS cluster."
  type        = string
  default     = "my-ecs-cluster"
}

/*
Variable: service_name
Description: The name of the ECS service.
Used by: ecs_service.tf

Requirement Addressed:
- **Scalability and Performance** (*Technical Specification/1.1 System Objectives*): Identifies the ECS service to manage and scale containerized applications.
*/
variable "service_name" {
  description = "The name of the ECS service."
  type        = string
  default     = "my-ecs-service"
}

/*
Variable: alb_name
Description: The name of the Application Load Balancer.
Used by: alb.tf

Requirement Addressed:
- **Scalability and Performance** (*Technical Specification/1.1 System Objectives*): Names the load balancer that distributes traffic, improving scalability and performance.
*/
variable "alb_name" {
  description = "The name of the Application Load Balancer."
  type        = string
  default     = "my-alb"
}

/*
Variable: alb_listener_port
Description: The listener port for the Application Load Balancer.
Used by: alb.tf

Requirement Addressed:
- **Scalability and Performance** (*Technical Specification/1.1 System Objectives*): Configures the load balancer listener to handle incoming traffic efficiently.
*/
variable "alb_listener_port" {
  description = "The listener port for the Application Load Balancer."
  type        = number
  default     = 80
}

/*
Variable: bucket_name_prefix
Description: The prefix for S3 bucket names.
Used by: s3_buckets.tf

Requirement Addressed:
- **Scalability and Performance** (*Technical Specification/1.1 System Objectives*): Facilitates scalable storage solutions by allowing dynamic naming of buckets.
*/
variable "bucket_name_prefix" {
  description = "The prefix for S3 bucket names."
  type        = string
  default     = "my-bucket"
}

/*
Variable: role_name_prefix
Description: The prefix for IAM role names.
Used by: iam_roles.tf

Requirement Addressed:
- **Scalability and Performance** (*Technical Specification/1.1 System Objectives*): Allows for scalable permission management by dynamically naming IAM roles.
*/
variable "role_name_prefix" {
  description = "The prefix for IAM role names."
  type        = string
  default     = "my-role"
}