import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// Custom metrics
const errorRate = new Rate('errors');

// Test configuration
export const options = {
  stages: [
    { duration: '30s', target: 20 },   // Ramp up to 20 users
    { duration: '1m', target: 20 },   // Stay at 20 users
    { duration: '30s', target: 50 },   // Ramp up to 50 users
    { duration: '1m', target: 50 },   // Stay at 50 users
    { duration: '30s', target: 0 },   // Ramp down to 0 users
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests should be below 500ms
    http_req_failed: ['rate<0.01'],   // Error rate should be less than 1%
    errors: ['rate<0.01'],
  },
};

// Base URL - change this to match your mock API server
const BASE_URL = 'http://localhost:3000/api';

// Sample hobby data
function generateRandomHobby() {
  const categories = ['Sports', 'Art & Creative', 'Music', 'Reading', 'Technology', 'Cooking', 'Travel', 'Other'];
  const priorities = ['High', 'Medium', 'Low'];
  
  const hobbyIndex = Math.floor(Math.random() * 1000);
  
  return {
    title: `Test Hobby ${hobbyIndex}`,
    description: `This is a test hobby description ${hobbyIndex}`,
    category: categories[Math.floor(Math.random() * categories.length)],
    priority: priorities[Math.floor(Math.random() * priorities.length)],
    completed: false,
  };
}

// Create a new hobby
function createHobby() {
  const hobby = generateRandomHobby();
  const payload = JSON.stringify(hobby);
  const params = {
    headers: { 'Content-Type': 'application/json' },
  };
  
  const res = http.post(`${BASE_URL}/hobbies`, payload, params);
  const success = check(res, {
    'create hobby status is 201': (r) => r.status === 201,
    'create hobby returns id': (r) => JSON.parse(r.body).id !== undefined,
  });
  
  errorRate.add(!success);
  return res.json();
}

// Get all hobbies
function getAllHobbies() {
  const res = http.get(`${BASE_URL}/hobbies`);
  const success = check(res, {
    'get all status is 200': (r) => r.status === 200,
    'get all returns array': (r) => Array.isArray(JSON.parse(r.body)),
  });
  
  errorRate.add(!success);
  return res.json();
}

// Get a single hobby
function getHobbyById(hobbyId) {
  const res = http.get(`${BASE_URL}/hobbies/${hobbyId}`);
  const success = check(res, {
    'get by id status is 200': (r) => r.status === 200,
    'get by id returns title': (r) => JSON.parse(r.body).title !== undefined,
  });
  
  errorRate.add(!success);
}

// Update a hobby
function updateHobby(hobbyId, hobby) {
  const payload = JSON.stringify({ ...hobby, title: hobby.title + ' (Updated)' });
  const params = {
    headers: { 'Content-Type': 'application/json' },
  };
  
  const res = http.put(`${BASE_URL}/hobbies/${hobbyId}`, payload, params);
  const success = check(res, {
    'update status is 200': (r) => r.status === 200,
  });
  
  errorRate.add(!success);
}

// Toggle completion
function toggleHobby(hobbyId) {
  const res = http.patch(`${BASE_URL}/hobbies/${hobbyId}/toggle`);
  const success = check(res, {
    'toggle status is 200': (r) => r.status === 200,
  });
  
  errorRate.add(!success);
}

// Delete a hobby
function deleteHobby(hobbyId) {
  const res = http.del(`${BASE_URL}/hobbies/${hobbyId}`);
  const success = check(res, {
    'delete status is 200 or 204': (r) => r.status === 200 || r.status === 204,
  });
  
  errorRate.add(!success);
}

// Main test function
export default function () {
  // Create a new hobby (20% probability)
  if (Math.random() < 0.2) {
    const hobby = createHobby();
    sleep(0.5);
    
    if (hobby && hobby.id) {
      // Get the created hobby (10% probability)
      if (Math.random() < 0.1) {
        getHobbyById(hobby.id);
        sleep(0.3);
      }
      
      // Update the hobby (10% probability)
      if (Math.random() < 0.1) {
        updateHobby(hobby.id, hobby);
        sleep(0.3);
      }
      
      // Toggle completion (15% probability)
      if (Math.random() < 0.15) {
        toggleHobby(hobby.id);
        sleep(0.3);
      }
      
      // Delete the hobby (5% probability)
      if (Math.random() < 0.05) {
        deleteHobby(hobby.id);
        sleep(0.3);
      }
    }
  } else {
    // Get all hobbies (80% probability)
    const hobbies = getAllHobbies();
    sleep(0.5);
    
    // If we have hobbies, sometimes view a random one
    if (hobbies && Array.isArray(hobbies) && hobbies.length > 0) {
      if (Math.random() < 0.3) {
        const randomHobby = hobbies[Math.floor(Math.random() * hobbies.length)];
        getHobbyById(randomHobby.id);
        sleep(0.3);
      }
    }
  }
  
  // Random delay between operations
  sleep(1);
}

// Setup function (runs once before all VUs)
export function setup() {
  console.log('Starting K6 load test...');
  console.log(`Testing API at: ${BASE_URL}`);
  return {};
}

// Teardown function (runs once after all VUs)
export function teardown(data) {
  console.log('Load test completed!');
}

