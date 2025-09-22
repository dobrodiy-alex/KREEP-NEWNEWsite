#!/usr/bin/env python3
"""
KREEP Store Backend API Testing Suite
Tests the contact form and newsletter subscription APIs
"""

import requests
import json
import time
from datetime import datetime
import sys
import os

# Get backend URL from frontend .env file
def get_backend_url():
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BASE_URL = get_backend_url()
if not BASE_URL:
    print("ERROR: Could not get REACT_APP_BACKEND_URL from frontend/.env")
    sys.exit(1)

API_BASE = f"{BASE_URL}/api"
print(f"Testing API at: {API_BASE}")

class TestResults:
    def __init__(self):
        self.passed = 0
        self.failed = 0
        self.errors = []
        
    def add_pass(self, test_name):
        self.passed += 1
        print(f"✅ PASS: {test_name}")
        
    def add_fail(self, test_name, error):
        self.failed += 1
        self.errors.append(f"{test_name}: {error}")
        print(f"❌ FAIL: {test_name} - {error}")
        
    def summary(self):
        total = self.passed + self.failed
        print(f"\n{'='*60}")
        print(f"TEST SUMMARY: {self.passed}/{total} tests passed")
        if self.errors:
            print(f"\nFAILED TESTS:")
            for error in self.errors:
                print(f"  - {error}")
        print(f"{'='*60}")
        return self.failed == 0

def test_api_health():
    """Test basic API connectivity"""
    results = TestResults()
    
    try:
        response = requests.get(f"{API_BASE}/", timeout=10)
        if response.status_code == 200:
            results.add_pass("API Health Check")
        else:
            results.add_fail("API Health Check", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("API Health Check", f"Connection error: {str(e)}")
    
    return results

def test_contact_form_api():
    """Test contact form API endpoint"""
    results = TestResults()
    
    # Test 1: Valid contact form submission
    valid_data = {
        "name": "Алексей Петров",
        "email": "alexey.petrov@example.com",
        "message": "Здравствуйте! Интересует ваш автономный магазин KREEP. Можете предоставить больше информации о технологии?"
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=valid_data, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") == True and "Спасибо за ваше сообщение" in data.get("message", ""):
                results.add_pass("Contact Form - Valid Submission")
            else:
                results.add_fail("Contact Form - Valid Submission", f"Unexpected response: {data}")
        else:
            results.add_fail("Contact Form - Valid Submission", f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        results.add_fail("Contact Form - Valid Submission", f"Request error: {str(e)}")
    
    # Test 2: Invalid email format
    invalid_email_data = {
        "name": "Test User",
        "email": "invalid-email",
        "message": "Test message"
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=invalid_email_data, timeout=10)
        if response.status_code == 422:  # FastAPI validation error
            results.add_pass("Contact Form - Invalid Email Validation")
        else:
            results.add_fail("Contact Form - Invalid Email Validation", f"Expected 422, got {response.status_code}")
    except Exception as e:
        results.add_fail("Contact Form - Invalid Email Validation", f"Request error: {str(e)}")
    
    # Test 3: Missing required fields
    missing_fields_data = {
        "name": "Test User"
        # Missing email and message
    }
    
    try:
        response = requests.post(f"{API_BASE}/contact", json=missing_fields_data, timeout=10)
        if response.status_code == 422:  # FastAPI validation error
            results.add_pass("Contact Form - Missing Fields Validation")
        else:
            results.add_fail("Contact Form - Missing Fields Validation", f"Expected 422, got {response.status_code}")
    except Exception as e:
        results.add_fail("Contact Form - Missing Fields Validation", f"Request error: {str(e)}")
    
    # Test 4: Empty request body
    try:
        response = requests.post(f"{API_BASE}/contact", json={}, timeout=10)
        if response.status_code == 422:  # FastAPI validation error
            results.add_pass("Contact Form - Empty Body Validation")
        else:
            results.add_fail("Contact Form - Empty Body Validation", f"Expected 422, got {response.status_code}")
    except Exception as e:
        results.add_fail("Contact Form - Empty Body Validation", f"Request error: {str(e)}")
    
    return results

def test_newsletter_api():
    """Test newsletter subscription API endpoint"""
    results = TestResults()
    
    # Generate unique email for testing
    timestamp = int(time.time())
    test_email = f"test.user.{timestamp}@example.com"
    
    # Test 1: Valid newsletter subscription
    valid_data = {
        "email": test_email
    }
    
    try:
        response = requests.post(f"{API_BASE}/newsletter", json=valid_data, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") == True and "успешно подписались" in data.get("message", ""):
                results.add_pass("Newsletter - Valid Subscription")
            else:
                results.add_fail("Newsletter - Valid Subscription", f"Unexpected response: {data}")
        else:
            results.add_fail("Newsletter - Valid Subscription", f"Status code: {response.status_code}, Response: {response.text}")
    except Exception as e:
        results.add_fail("Newsletter - Valid Subscription", f"Request error: {str(e)}")
    
    # Test 2: Duplicate subscription prevention
    try:
        response = requests.post(f"{API_BASE}/newsletter", json=valid_data, timeout=10)
        if response.status_code == 200:
            data = response.json()
            if data.get("success") == True and "уже подписаны" in data.get("message", ""):
                results.add_pass("Newsletter - Duplicate Prevention")
            else:
                results.add_fail("Newsletter - Duplicate Prevention", f"Expected duplicate message, got: {data}")
        else:
            results.add_fail("Newsletter - Duplicate Prevention", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Newsletter - Duplicate Prevention", f"Request error: {str(e)}")
    
    # Test 3: Invalid email format
    invalid_email_data = {
        "email": "invalid-email-format"
    }
    
    try:
        response = requests.post(f"{API_BASE}/newsletter", json=invalid_email_data, timeout=10)
        if response.status_code == 422:  # FastAPI validation error
            results.add_pass("Newsletter - Invalid Email Validation")
        else:
            results.add_fail("Newsletter - Invalid Email Validation", f"Expected 422, got {response.status_code}")
    except Exception as e:
        results.add_fail("Newsletter - Invalid Email Validation", f"Request error: {str(e)}")
    
    # Test 4: Missing email field
    try:
        response = requests.post(f"{API_BASE}/newsletter", json={}, timeout=10)
        if response.status_code == 422:  # FastAPI validation error
            results.add_pass("Newsletter - Missing Email Validation")
        else:
            results.add_fail("Newsletter - Missing Email Validation", f"Expected 422, got {response.status_code}")
    except Exception as e:
        results.add_fail("Newsletter - Missing Email Validation", f"Request error: {str(e)}")
    
    return results

def test_admin_endpoints():
    """Test admin endpoints for viewing submissions"""
    results = TestResults()
    
    # Test 1: Get contact messages
    try:
        response = requests.get(f"{API_BASE}/contact/messages", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                results.add_pass("Admin - Get Contact Messages")
                print(f"  Found {len(data)} contact messages")
            else:
                results.add_fail("Admin - Get Contact Messages", f"Expected list, got: {type(data)}")
        else:
            results.add_fail("Admin - Get Contact Messages", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Admin - Get Contact Messages", f"Request error: {str(e)}")
    
    # Test 2: Get newsletter subscriptions
    try:
        response = requests.get(f"{API_BASE}/newsletter/subscriptions", timeout=10)
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list):
                results.add_pass("Admin - Get Newsletter Subscriptions")
                print(f"  Found {len(data)} newsletter subscriptions")
            else:
                results.add_fail("Admin - Get Newsletter Subscriptions", f"Expected list, got: {type(data)}")
        else:
            results.add_fail("Admin - Get Newsletter Subscriptions", f"Status code: {response.status_code}")
    except Exception as e:
        results.add_fail("Admin - Get Newsletter Subscriptions", f"Request error: {str(e)}")
    
    return results

def test_data_persistence():
    """Test that data is properly stored and retrievable"""
    results = TestResults()
    
    # Submit a test contact form and verify it appears in admin endpoint
    timestamp = int(time.time())
    test_contact_data = {
        "name": f"Test User {timestamp}",
        "email": f"testuser{timestamp}@example.com",
        "message": f"Test message submitted at {datetime.now()}"
    }
    
    try:
        # Submit contact form
        submit_response = requests.post(f"{API_BASE}/contact", json=test_contact_data, timeout=10)
        if submit_response.status_code != 200:
            results.add_fail("Data Persistence - Contact Form Submit", f"Failed to submit: {submit_response.status_code}")
            return results
        
        # Wait a moment for data to be stored
        time.sleep(1)
        
        # Retrieve contact messages
        get_response = requests.get(f"{API_BASE}/contact/messages", timeout=10)
        if get_response.status_code == 200:
            messages = get_response.json()
            # Check if our test message is in the results
            found = False
            for message in messages:
                if message.get("email") == test_contact_data["email"]:
                    found = True
                    break
            
            if found:
                results.add_pass("Data Persistence - Contact Form Storage")
            else:
                results.add_fail("Data Persistence - Contact Form Storage", "Submitted message not found in database")
        else:
            results.add_fail("Data Persistence - Contact Form Storage", f"Failed to retrieve messages: {get_response.status_code}")
    
    except Exception as e:
        results.add_fail("Data Persistence - Contact Form Storage", f"Error: {str(e)}")
    
    return results

def main():
    """Run all tests"""
    print("🚀 Starting KREEP Store Backend API Tests")
    print(f"Testing against: {API_BASE}")
    print("="*60)
    
    all_results = TestResults()
    
    # Run all test suites
    test_suites = [
        ("API Health", test_api_health),
        ("Contact Form API", test_contact_form_api),
        ("Newsletter API", test_newsletter_api),
        ("Admin Endpoints", test_admin_endpoints),
        ("Data Persistence", test_data_persistence)
    ]
    
    for suite_name, test_func in test_suites:
        print(f"\n📋 Running {suite_name} Tests:")
        print("-" * 40)
        
        suite_results = test_func()
        all_results.passed += suite_results.passed
        all_results.failed += suite_results.failed
        all_results.errors.extend(suite_results.errors)
    
    # Final summary
    success = all_results.summary()
    
    if success:
        print("\n🎉 All tests passed! Backend API is working correctly.")
        return 0
    else:
        print(f"\n⚠️  {all_results.failed} test(s) failed. Please check the issues above.")
        return 1

if __name__ == "__main__":
    exit_code = main()
    sys.exit(exit_code)