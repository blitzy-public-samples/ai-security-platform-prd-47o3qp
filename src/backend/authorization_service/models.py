# External dependencies
from sqlalchemy import Column, Integer, String, ForeignKey, Table  # SQLAlchemy version 1.4.22
from sqlalchemy.orm import relationship, backref
from sqlalchemy.ext.declarative import declarative_base

# Internal dependencies
from src.backend.authorization_service.config import configure_database  # Configures the database connection for the authorization service.

# Base class for declarative models
Base = declarative_base()

# Association table for Role and Permission many-to-many relationship
role_permissions = Table(
    'role_permissions',
    Base.metadata,
    Column('role_id', Integer, ForeignKey('roles.id')),
    Column('permission_id', Integer, ForeignKey('permissions.id'))
)

class Role(Base):
    """
    Represents a user role in the system, defining the permissions associated with that role.

    Addresses Requirement:
    - Implement Role-Based Access Control (RBAC) for user permissions.
      Location: Technical Requirements/4.6 User and System Management
    """

    __tablename__ = 'roles'

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)
    permissions = relationship(
        'Permission',
        secondary=role_permissions,
        backref=backref('roles', lazy='dynamic')
    )

    def __init__(self, name, permissions=None):
        """
        Initializes a Role instance with a name and an optional list of permissions.

        Parameters:
        - name (str): The name of the role.
        - permissions (list of Permission): A list of permissions associated with the role.

        Steps:
        1. Assign the name to the Role instance.
        2. Initialize the permissions list for the Role instance.
        """
        self.name = name
        self.permissions = permissions if permissions is not None else []

    def add_permission(self, permission):
        """
        Adds a permission to the role.

        Parameters:
        - permission (Permission): The permission to add.

        Returns:
        - bool: True if the permission was added successfully, False if it already exists.

        Steps:
        1. Check if the permission already exists in the role's permissions.
        2. If not, add the permission to the role's permissions list.
        3. Return the result of the operation.
        """
        if permission not in self.permissions:
            self.permissions.append(permission)
            return True
        return False

class Permission(Base):
    """
    Represents a permission that can be assigned to roles to control access to resources.

    Addresses Requirement:
    - Implement Role-Based Access Control (RBAC) for user permissions.
      Location: Technical Requirements/4.6 User and System Management
    """

    __tablename__ = 'permissions'

    id = Column(Integer, primary_key=True)
    name = Column(String, unique=True, nullable=False)

    def __init__(self, name):
        """
        Initializes a Permission instance with a name.

        Parameters:
        - name (str): The name of the permission.

        Steps:
        1. Assign the name to the Permission instance.
        """
        self.name = name