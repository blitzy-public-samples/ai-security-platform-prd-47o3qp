/*
  This Terraform configuration file is responsible for defining and managing the Virtual Private Cloud (VPC) within the network module.
  The VPC provides network isolation and security for AWS resources, enabling the creation of subnets, route tables, and network gateways.

  Addresses requirement:
  - Scalability and Performance (Technical Specification/1.1 System Objectives)
    Description: Design a scalable architecture capable of handling increasing data volumes and user bases without performance degradation.
*/

/*
  External Dependencies:
  - aws_vpc resource from the hashicorp/aws provider (version >= 3.0.0)
    Purpose: To define and manage AWS Virtual Private Clouds.

  Internal Dependencies:
  - security_groups module (infrastructure/terraform/modules/network/security_groups.tf)
    Purpose: Defines security groups associated with the VPC for controlling inbound and outbound traffic.
*/

// Declare variables for module inputs

variable "vpc_cidr_block" {
  description = "The CIDR block for the VPC."
  type        = string
  default     = "10.0.0.0/16" // From globals in the specification
}

variable "enable_dns_support" {
  description = "A boolean flag to enable or disable DNS support in the VPC."
  type        = bool
  default     = true // Enable DNS support as per the specification steps
}

variable "enable_dns_hostnames" {
  description = "A boolean flag to enable or disable DNS hostnames in the VPC."
  type        = bool
  default     = true // Enable DNS hostnames as per the specification steps
}

variable "tags" {
  description = "A map of tags to assign to the VPC for resource identification and management."
  type        = map(string)
  default     = {} // Empty map by default; can be overridden
}

resource "aws_vpc" "main" {
  /*
    Resource: aws_vpc
    Description: Defines a VPC to provide network isolation and security for AWS resources.

    Parameters:
    - cidr_block (string): The CIDR block for the VPC.
    - enable_dns_support (bool): Enables DNS support within the VPC.
    - enable_dns_hostnames (bool): Enables instances within the VPC to have DNS hostnames.
    - tags (map): Tags attached to the VPC for identification and management.

    Steps:
    1. Create a VPC with a specified CIDR block.
    2. Enable DNS support and hostnames for the VPC.
    3. Attach tags for resource identification and management.
  */

  // Create a VPC with the specified CIDR block
  cidr_block = var.vpc_cidr_block

  // Enable DNS support within the VPC
  enable_dns_support = var.enable_dns_support

  // Enable DNS hostnames within the VPC
  enable_dns_hostnames = var.enable_dns_hostnames

  // Attach tags to the VPC for resource identification and management
  tags = var.tags
}

/*
  Output: vpc_id
  Description: The ID of the created VPC.
  Useful for referencing the VPC in other modules or resources, such as security groups (see Internal Dependencies).
*/
output "vpc_id" {
  description = "The ID of the created VPC."
  value       = aws_vpc.main.id
}