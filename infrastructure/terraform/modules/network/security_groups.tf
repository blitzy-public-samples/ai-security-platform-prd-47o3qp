# This Terraform module defines a security group to control inbound and outbound traffic for AWS resources.
# It addresses the 'Security and Compliance' requirement (Technical Requirements/Security and Compliance)
# by ensuring that the platform is secure against unauthorized access, data breaches, and other security threats
# through robust network access control.

# External Dependency: Uses 'aws_security_group' resource from 'hashicorp/aws' provider (version >= 3.0.0)
# Version specified in the root module's provider configuration.

# Define the name of the security group. Default is 'default-sg'.
variable "name" {
  description = "Name of the security group"
  type        = string
  default     = "default-sg"
}

# Define the description of the security group.
variable "description" {
  description = "Description of the security group"
  type        = string
  default     = "Security group for controlling inbound and outbound traffic."
}

# VPC ID where the security group will be created.
# Depends on the 'vpc' module defined in 'infrastructure/terraform/modules/network/vpc.tf'.
variable "vpc_id" {
  description = "The VPC ID where the security group will be created"
  type        = string
}

# Ingress rules for inbound traffic.
# Allows specifying multiple ingress rules to control inbound traffic as per 'Security and Compliance' requirements.
variable "ingress" {
  description = "List of ingress rules for inbound traffic"
  type = list(object({
    from_port         = number          # Starting port for the rule
    to_port           = number          # Ending port for the rule
    protocol          = string          # Protocol (tcp, udp, icmp, -1 for all)
    cidr_blocks       = list(string)    # IPv4 CIDR blocks
    ipv6_cidr_blocks  = list(string)    # IPv6 CIDR blocks
    prefix_list_ids   = list(string)    # Prefix list IDs
    security_groups   = list(string)    # Security group IDs
    self              = bool            # Whether the rule includes the security group itself as a source
    description       = string          # Description of the ingress rule
  }))
  default = []
}

# Egress rules for outbound traffic.
# Allows specifying multiple egress rules to control outbound traffic as per 'Security and Compliance' requirements.
variable "egress" {
  description = "List of egress rules for outbound traffic"
  type = list(object({
    from_port         = number          # Starting port for the rule
    to_port           = number          # Ending port for the rule
    protocol          = string          # Protocol (tcp, udp, icmp, -1 for all)
    cidr_blocks       = list(string)    # IPv4 CIDR blocks
    ipv6_cidr_blocks  = list(string)    # IPv6 CIDR blocks
    prefix_list_ids   = list(string)    # Prefix list IDs
    security_groups   = list(string)    # Security group IDs
    self              = bool            # Whether the rule includes the security group itself as a destination
    description       = string          # Description of the egress rule
  }))
  default = []
}

# Tags for resource identification and management.
variable "tags" {
  description = "A map of tags to assign to the resource"
  type        = map(string)
  default     = {}
}

# Defines the AWS Security Group resource.
resource "aws_security_group" "default" {
  name        = var.name
  description = var.description
  vpc_id      = var.vpc_id

  # Create ingress rules to allow specific inbound traffic.
  # Addresses 'Security and Compliance' (Technical Requirements/Security and Compliance) by controlling inbound access.
  dynamic "ingress" {
    for_each = var.ingress
    content {
      description      = ingress.value.description
      from_port        = ingress.value.from_port
      to_port          = ingress.value.to_port
      protocol         = ingress.value.protocol
      cidr_blocks      = ingress.value.cidr_blocks
      ipv6_cidr_blocks = ingress.value.ipv6_cidr_blocks
      prefix_list_ids  = ingress.value.prefix_list_ids
      security_groups  = ingress.value.security_groups
      self             = ingress.value.self
    }
  }

  # Create egress rules to allow specific outbound traffic.
  # Addresses 'Security and Compliance' (Technical Requirements/Security and Compliance) by controlling outbound access.
  dynamic "egress" {
    for_each = var.egress
    content {
      description      = egress.value.description
      from_port        = egress.value.from_port
      to_port          = egress.value.to_port
      protocol         = egress.value.protocol
      cidr_blocks      = egress.value.cidr_blocks
      ipv6_cidr_blocks = egress.value.ipv6_cidr_blocks
      prefix_list_ids  = egress.value.prefix_list_ids
      security_groups  = egress.value.security_groups
      self             = egress.value.self
    }
  }

  # Attach tags for resource identification and management.
  # Supports 'User and System Management' (Technical Requirements/User and System Management).
  tags = merge(
    {
      "Name" = var.name
    },
    var.tags
  )
}

# Output the ID of the created security group.
# Allows other modules to reference this security group.
output "security_group_id" {
  description = "The ID of the created security group"
  value       = aws_security_group.default.id
}