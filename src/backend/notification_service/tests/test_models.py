# External dependencies imports with versions
import pytest  # pytest version 6.2.4
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import sqlalchemy  # SQLAlchemy version 1.4.22

# Internal dependencies
from src.backend.notification_service.models import Notification  # Defines the data model for notifications.
from src.backend.notification_service.config import load_config  # Loads configuration settings for the notification service.

# Pytest fixture to create a test database session
@pytest.fixture(scope='module')
def test_session():
    """
    Fixture to initialize the test database and provide a session for tests.
    
    Addresses:
    - Ensures the notification data model is correctly implemented and tested, providing reliable notification management.
    - Technical Specification/1.3 System Architecture - Data Layer
    
    Steps:
    - Initialize the test database and load configuration using load_config.
    - Create all tables in the database based on the models.
    - Yield a database session for use in tests.
    """
    # Load configuration settings
    config = load_config()

    # Initialize the in-memory SQLite test database
    engine = create_engine('sqlite:///:memory:', echo=False)

    # Create all tables in the test database
    Notification.metadata.create_all(engine)

    # Create a configured "Session" class
    Session = sessionmaker(bind=engine)

    # Create a Session object
    session = Session()

    yield session

    # Teardown the session and dispose the engine
    session.close()
    engine.dispose()

def test_notification_creation(test_session):
    """
    Tests the creation of a new notification instance.

    Addresses:
    - Ensures the notification data model supports creation of notification entities.
    - Technical Specification/4.5 Comprehensive Case Management, TR-CM-005-1

    Steps:
    - Create a new Notification instance with test data.
    - Assert that the Notification instance is created with the correct attributes.
    - Verify that the Notification instance is saved in the database.
    """
    # Create a new Notification instance with test data
    notification = Notification(
        title='Test Notification',
        message='This is a test notification.',
        recipient='test_user@example.com',
        status='pending'
    )

    # Add the notification to the session
    test_session.add(notification)
    test_session.commit()

    # Retrieve the notification from the database
    saved_notification = test_session.query(Notification).filter_by(id=notification.id).first()

    # Assert that the Notification instance is created with the correct attributes
    assert saved_notification is not None, "Notification instance was not saved in the database."
    assert saved_notification.title == 'Test Notification', "Notification title does not match."
    assert saved_notification.message == 'This is a test notification.', "Notification message does not match."
    assert saved_notification.recipient == 'test_user@example.com', "Notification recipient does not match."
    assert saved_notification.status == 'pending', "Notification status does not match."

def test_notification_status_update(test_session):
    """
    Tests updating the status of a notification.

    Addresses:
    - Ensures the notification data model supports updates to notification entities.
    - Technical Specification/4.5 Comprehensive Case Management, TR-CM-005-2

    Steps:
    - Create a new Notification instance and save it to the database.
    - Update the status of the Notification instance to 'sent'.
    - Assert that the status is updated correctly in the database.
    """
    # Create a new Notification instance
    notification = Notification(
        title='Status Update Test',
        message='Testing status update.',
        recipient='status_test_user@example.com',
        status='pending'
    )

    # Add the notification to the session and commit
    test_session.add(notification)
    test_session.commit()

    # Update the status of the Notification instance to 'sent'
    notification.status = 'sent'
    test_session.commit()

    # Retrieve the updated notification from the database
    updated_notification = test_session.query(Notification).filter_by(id=notification.id).first()

    # Assert that the status is updated correctly
    assert updated_notification.status == 'sent', "Notification status was not updated correctly."