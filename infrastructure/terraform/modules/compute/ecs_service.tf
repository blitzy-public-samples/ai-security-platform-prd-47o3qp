// Variable for the ECS service name, defaulting to "my-ecs-service"
// Requirement Addressed: Scalability and Performance (Technical Specification/1.1 System Objectives)
variable "service_name" {
  description = "The name of the ECS service."
  type        = string
  default     = "my-ecs-service"
}

// Variable for the ECS cluster to deploy the service on
// Dependency: Defines the ECS cluster on which the ECS service will run.
// Requirement Addressed: Scalability and Performance (Technical Specification/1.1 System Objectives)
variable "cluster" {
  description = "The ARN or name of the ECS cluster on which to deploy the service."
  type        = string
}

// Variable for the task definition for the ECS service
// Necessary for defining the containers to run in the service
variable "task_definition" {
  description = "The family and revision (family:revision) or full ARN of the task definition to run in the service."
  type        = string
}

// Variable for the desired number of tasks to run
// Supports scalability by allowing adjustment of the number of running tasks
// Requirement Addressed: Scalability and Performance (Technical Specification/1.1 System Objectives)
variable "desired_count" {
  description = "The number of instances of the task definition to run."
  type        = number
  default     = 1
}

// Variable for the security groups associated with the ECS service for network access control
// Dependency: Associates security groups with the ECS service
variable "security_groups" {
  description = "A list of security group IDs to associate with the service."
  type        = list(string)
}

// Variable for the subnets in which to deploy the service
// Dependency: Provides the VPC configuration necessary for the ECS service's networking
variable "subnets" {
  description = "A list of subnet IDs for the ECS service."
  type        = list(string)
}

// Variable for the Application Load Balancer target group ARN
// Dependency: Integrates the ECS service with an Application Load Balancer for traffic distribution
variable "load_balancer" {
  description = "The ARN of the load balancer target group to associate with the service."
  type        = string
}

// Variable for the container name
// Necessary for load balancer configuration
variable "container_name" {
  description = "The name of the container to associate with the load balancer."
  type        = string
}

// Variable for the container port
// Necessary for load balancer configuration
variable "container_port" {
  description = "The port on the container to associate with the load balancer."
  type        = number
}

// Variable for tags to attach to the ECS service
// For resource identification and management
variable "tags" {
  description = "A map of tags to assign to the ECS service."
  type        = map(string)
  default     = {}
}

// Defines an ECS service to run containerized applications on AWS.
// Resource: aws_ecs_service (from hashicorp/aws >= 3.0.0)
// Purpose: To define and manage AWS ECS services
// Requirement Addressed: Scalability and Performance (Technical Specification/1.1 System Objectives)
resource "aws_ecs_service" "main" {
  // Name of the ECS service
  name            = var.service_name

  // ECS cluster where the service will be deployed
  cluster         = var.cluster

  // Task definition to use for tasks in the service
  task_definition = var.task_definition

  // Number of desired task instances to run, supporting scalability
  desired_count   = var.desired_count

  // Network configuration for associating security groups and subnets
  network_configuration {
    // Subnets in which to deploy the ECS service tasks
    subnets          = var.subnets

    // Security groups for network access control
    security_groups  = var.security_groups

    // Assign a public IP address to the tasks (set to true if required)
    assign_public_ip = false
  }

  // Load balancer configuration to integrate with an Application Load Balancer for traffic management
  load_balancer {
    // ARN of the target group to associate with the service
    target_group_arn = var.load_balancer

    // Name of the container to associate with the load balancer
    container_name   = var.container_name

    // Port on the container to associate with the load balancer
    container_port   = var.container_port
  }

  // Deployment configuration to manage rolling updates and maintain service availability
  deployment_maximum_percent         = 200  // Allows deploying additional tasks (up to 200%) during updates
  deployment_minimum_healthy_percent = 50   // Ensures at least 50% of the desired tasks are running and healthy

  // Tags for resource identification and management
  tags = var.tags
}

// Output the ARN of the created ECS service
output "service_arn" {
  description = "The ARN of the created ECS service."
  value       = aws_ecs_service.main.arn
}