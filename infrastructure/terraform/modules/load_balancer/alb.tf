// Module for creating an Application Load Balancer (ALB)
// This module defines and manages the ALB within the load balancer module.
// The ALB distributes incoming application traffic across multiple targets,
// such as ECS services, to ensure high availability and reliability.

// Requirements Addressed:
// - Scalability and Performance (Technical Specification/1.1 System Objectives)
//   Design a scalable architecture capable of handling increasing data volumes and
//   user bases without performance degradation.
// - Performance Optimization (Technical Specification/TR-PO-012)
//   Implement load balancing and horizontal scaling to manage high traffic efficiently.

// Dependencies:
// - Internal:
//   - ECS Service (infrastructure/terraform/modules/compute/ecs_service.tf): 
//     Integrates the ECS service with the Application Load Balancer for traffic distribution.
//   - Security Groups (infrastructure/terraform/modules/network/security_groups.tf): 
//     Associates security groups with the ALB for network access control.
//   - VPC (infrastructure/terraform/modules/network/vpc.tf): 
//     Provides the VPC configuration necessary for the ALB's networking.
// - External:
//   - AWS Provider (hashicorp/aws, version >= 3.0.0): 
//     Provides the 'aws_lb' resource to define and manage AWS Application Load Balancers.

// Define variables for ALB configuration

variable "alb_name" {
  description = "The name of the Application Load Balancer"
  type        = string
  default     = "my-alb"
}

variable "alb_internal" {
  description = "Whether the ALB is internal (true) or internet-facing (false)"
  type        = bool
  default     = false
}

variable "alb_listener_port" {
  description = "Port on which the ALB will listen for incoming traffic"
  type        = number
  default     = 80
}

variable "security_groups" {
  description = "List of security group IDs to associate with the ALB"
  type        = list(string)
}

variable "subnets" {
  description = "List of subnet IDs to attach the ALB to"
  type        = list(string)
}

variable "tags" {
  description = "A map of tags to assign to the ALB"
  type        = map(string)
  default     = {}
}

// Create an Application Load Balancer with the specified configuration
resource "aws_lb" "main" {
  name               = var.alb_name
  load_balancer_type = "application"
  internal           = var.alb_internal
  security_groups    = var.security_groups
  subnets            = var.subnets
  tags               = var.tags

  // The aws_lb resource from hashicorp/aws provider version >= 3.0.0
  // defines and manages an AWS Application Load Balancer.
  // It addresses the need for scalability and high availability by distributing traffic
  // across multiple targets (Technical Specification/1.1 System Objectives and TR-SC-017).
}

// Create a listener for the ALB to accept incoming traffic
resource "aws_lb_listener" "http" {
  load_balancer_arn = aws_lb.main.arn
  port              = var.alb_listener_port
  protocol          = "HTTP"
  default_action {
    // Placeholder for default action; typically forwards to a target group
    type = "fixed-response"
    fixed_response {
      content_type = "text/plain"
      message_body = "Default response"
      status_code  = "200"
    }
  }

  // The aws_lb_listener resource allows the ALB to listen on the specified port.
  // Configuring listeners is essential for handling incoming requests and is key to
  // supporting advanced incident response automation (Technical Specification/TR-IR-001).
}

// Output the DNS name of the ALB
output "alb_dns_name" {
  description = "The DNS name of the Application Load Balancer."
  value       = aws_lb.main.dns_name
}