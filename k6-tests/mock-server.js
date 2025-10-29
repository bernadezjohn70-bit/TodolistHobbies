/**
 * Mock API Server for K6 Load Testing
 * 
 * This simple Express server simulates the Hobbies app's storage operations
 * Run this before running k6 tests:
 *   node mock-server.js
 * 
 * Then run tests from another terminal:
 *   ./run-tests.sh
 */

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (simulates AsyncStorage)
let hobbies = [];
let nextId = 1;

// Helper to generate IDs
function generateId() {
  return (nextId++).toString();
}

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Get all hobbies
app.get('/api/hobbies', (req, res) => {
  res.json(hobbies);
});

// Get single hobby
app.get('/api/hobbies/:id', (req, res) => {
  const hobby = hobbies.find(h => h.id === req.params.id);
  if (!hobby) {
    return res.status(404).json({ error: 'Hobby not found' });
  }
  res.json(hobby);
});

// Create hobby
app.post('/api/hobbies', (req, res) => {
  const { title, description, category, priority, completed } = req.body;
  
  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }
  
  const hobby = {
    id: generateId(),
    title,
    description: description || '',
    category: category || 'Other',
    priority: priority || 'Medium',
    completed: completed || false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  
  hobbies.push(hobby);
  res.status(201).json(hobby);
});

// Update hobby
app.put('/api/hobbies/:id', (req, res) => {
  const index = hobbies.findIndex(h => h.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Hobby not found' });
  }
  
  const updated = {
    ...hobbies[index],
    ...req.body,
    id: hobbies[index].id, // Don't allow ID changes
    updatedAt: new Date().toISOString(),
  };
  
  hobbies[index] = updated;
  res.json(updated);
});

// Toggle completion
app.patch('/api/hobbies/:id/toggle', (req, res) => {
  const index = hobbies.findIndex(h => h.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Hobby not found' });
  }
  
  hobbies[index] = {
    ...hobbies[index],
    completed: !hobbies[index].completed,
    updatedAt: new Date().toISOString(),
  };
  
  res.json(hobbies[index]);
});

// Delete hobby
app.delete('/api/hobbies/:id', (req, res) => {
  const index = hobbies.findIndex(h => h.id === req.params.id);
  
  if (index === -1) {
    return res.status(404).json({ error: 'Hobby not found' });
  }
  
  hobbies.splice(index, 1);
  res.status(200).json({ message: 'Hobby deleted' });
});

// Reset storage (for testing)
app.post('/api/reset', (req, res) => {
  hobbies = [];
  nextId = 1;
  res.json({ message: 'Storage reset' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Mock API server running on http://localhost:${PORT}`);
  console.log(`📡 Endpoints available:`);
  console.log(`   GET    /api/health`);
  console.log(`   GET    /api/hobbies`);
  console.log(`   GET    /api/hobbies/:id`);
  console.log(`   POST   /api/hobbies`);
  console.log(`   PUT    /api/hobbies/:id`);
  console.log(`   PATCH  /api/hobbies/:id/toggle`);
  console.log(`   DELETE /api/hobbies/:id`);
  console.log(`\n💡 Run k6 tests in another terminal: ./run-tests.sh`);
});

