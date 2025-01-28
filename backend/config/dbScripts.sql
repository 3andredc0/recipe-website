CREATE DATABASE recipewebsite;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    admin BOOLEAN DEFAULT FALSE,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE recipes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    ingredients JSON NOT NULL,
    instructions TEXT NOT NULL,
    time VARCHAR(255),
    coverImage VARCHAR(255),
    createdBy INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (createdBy) REFERENCES Users(id) ON DELETE CASCADE
);

CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    recipeId INT NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (recipeId) REFERENCES recipes(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (userId, recipeId) -- Prevent duplicate favorites
);

INSERT INTO users (email, password, admin) VALUES
-- Admins
('admin1@example.com', '$2b$10$5v5Zz7J9Xy6Z1Zz7J9Xy6uZ1Zz7J9Xy6uZ1Zz7J9Xy6uZ1Zz7J9Xy6u', TRUE),
('admin2@example.com', '$2b$10$6w6Yy8K0Xz7A1B2C3D4E5Fv6w6Yy8K0Xz7A1B2C3D4E5Fv6w6Yy8K0Xz7', TRUE),

-- Regular Users
('user1@example.com', '$2b$10$7x7Zz9L1Yy8B2C3D4E5F6G7x7Zz9L1Yy8B2C3D4E5F6G7x7Zz9L1Yy8', FALSE),
('user2@example.com', '$2b$10$8y8A0M2Zz9C1D2E3F4G5H6I8y8A0M2Zz9C1D2E3F4G5H6I8y8A0M2Zz9', FALSE),
('user3@example.com', '$2b$10$9z9B1N3Aa0D1E2F3G4H5I6J9z9B1N3Aa0D1E2F3G4H5I6J9z9B1N3Aa0', FALSE),
('user4@example.com', '$2b$10$0a0C2O4Bb1E2F3G4H5I6J7K0a0C2O4Bb1E2F3G4H5I6J7K0a0C2O4Bb1', FALSE),
('user5@example.com', '$2b$10$1b1D3P5Cc2F3G4H5I6J7K8L1b1D3P5Cc2F3G4H5I6J7K8L1b1D3P5Cc2', FALSE),
('user6@example.com', '$2b$10$2c2E4Q6Dd3G4H5I6J7K8L9M2c2E4Q6Dd3G4H5I6J7K8L9M2c2E4Q6Dd3', FALSE),
('user7@example.com', '$2b$10$3d3F5R7Ee4H5I6J7K8L9M0N3d3F5R7Ee4H5I6J7K8L9M0N3d3F5R7Ee4', FALSE),
('user8@example.com', '$2b$10$4e4G6S8Ff5I6J7K8L9M0N1O4e4G6S8Ff5I6J7K8L9M0N1O4e4G6S8Ff5', FALSE);

INSERT INTO recipes (title, ingredients, instructions, time, coverImage, createdBy) VALUES
-- Recipes by User 1
('Spaghetti Carbonara', '["200g spaghetti", "100g pancetta", "2 eggs", "50g parmesan", "2 garlic cloves", "Salt", "Black pepper"]', '1. Cook spaghetti. 2. Fry pancetta with garlic. 3. Mix eggs and parmesan. 4. Combine everything and serve.', '20 mins', '1721907777562-file', 3),
('Chicken Curry', '["500g chicken", "1 onion", "2 tomatoes", "1 tbsp curry powder", "1 cup coconut milk", "Salt", "Oil"]', '1. Cook chicken. 2. Fry onions and tomatoes. 3. Add curry powder and coconut milk. 4. Simmer and serve.', '40 mins', '1721908837733-file', 3),

-- Recipes by User 2
('Beef Tacos', '["300g beef", "6 taco shells", "1 onion", "1 tomato", "1 lettuce", "1 cup cheese", "Taco seasoning"]', '1. Cook beef with seasoning. 2. Chop veggies. 3. Fill taco shells and serve.', '25 mins', '1721914556773-file', 4),
('Pancakes', '["1 cup flour", "1 cup milk", "1 egg", "2 tbsp sugar", "1 tsp baking powder", "Butter"]', '1. Mix dry ingredients. 2. Add wet ingredients. 3. Cook on a pan and serve with syrup.', '15 mins', '1721914591531-file', 4),

-- Recipes by User 3
('Caesar Salad', '["1 romaine lettuce", "100g croutons", "50g parmesan", "1 chicken breast", "Caesar dressing"]', '1. Grill chicken. 2. Toss lettuce, croutons, and dressing. 3. Top with chicken and parmesan.', '15 mins', '1721915546889-file', 5),
('Chocolate Cake', '["2 cups flour", "1 cup sugar", "1/2 cup cocoa powder", "1 cup milk", "1/2 cup oil", "2 eggs", "1 tsp baking powder"]', '1. Mix dry ingredients. 2. Add wet ingredients. 3. Bake at 180°C for 30 mins.', '50 mins', '1721916302829-file', 5),

-- Recipes by User 4
('Vegetable Stir Fry', '["1 cup broccoli", "1 bell pepper", "1 carrot", "1 onion", "2 tbsp soy sauce", "1 tbsp oil"]', '1. Chop veggies. 2. Stir fry in oil. 3. Add soy sauce and serve.', '20 mins', '1721916821899-file', 6),
('Tomato Soup', '["4 tomatoes", "1 onion", "2 garlic cloves", "1 cup vegetable stock", "Salt", "Pepper"]', '1. Cook tomatoes, onion, and garlic. 2. Blend and add stock. 3. Season and serve.', '30 mins', '1721916917798-file', 6),

-- Recipes by User 5
('Grilled Salmon', '["2 salmon fillets", "1 lemon", "2 tbsp olive oil", "Salt", "Pepper"]', '1. Season salmon. 2. Grill for 5 mins each side. 3. Serve with lemon.', '15 mins', '1721917590869-file', 7),
('Vegetable Lasagna', '["1 cup pasta sheets", "1 cup tomato sauce", "1 cup ricotta", "1 cup spinach", "1 cup mushrooms", "1 cup cheese"]', '1. Layer pasta, sauce, and veggies. 2. Bake at 180°C for 30 mins.', '45 mins', '1721917624125-file', 7),

-- Recipes by User 6
('Beef Burger', '["300g beef", "2 burger buns", "1 tomato", "1 lettuce", "1 onion", "1 slice cheese", "Ketchup"]', '1. Grill beef patty. 2. Assemble burger with veggies and cheese.', '20 mins', '1721917953592-file', 8),
('Fruit Smoothie', '["1 banana", "1 cup strawberries", "1 cup yogurt", "1/2 cup milk", "1 tbsp honey"]', '1. Blend all ingredients. 2. Serve chilled.', '10 mins', '1721918076583-file', 8),

-- Recipes by User 7
('Shrimp Scampi', '["200g shrimp", "200g pasta", "3 garlic cloves", "1/2 cup white wine", "2 tbsp butter", "Salt", "Pepper"]', '1. Cook pasta. 2. Sauté shrimp and garlic. 3. Add wine and butter. 4. Combine and serve.', '25 mins', '1721919124382-file', 9),
('Cheesecake', '["200g biscuits", "100g butter", "500g cream cheese", "1 cup sugar", "1 cup cream", "1 tsp vanilla"]', '1. Make biscuit base. 2. Mix filling ingredients. 3. Chill for 4 hours.', '4 hours', '17222329430920-file', 9),

-- Recipes by User 8
('Chicken Noodle Soup', '["1 chicken breast", "1 cup noodles", "1 carrot", "1 celery stalk", "1 onion", "4 cups chicken stock"]', '1. Cook chicken and veggies. 2. Add noodles and stock. 3. Simmer and serve.', '30 mins', '17222329694772-file', 10),
('Banana Bread', '["2 bananas", "1 cup flour", "1/2 cup sugar", "1/2 cup butter", "1 egg", "1 tsp baking soda"]', '1. Mash bananas. 2. Mix all ingredients. 3. Bake at 180°C for 50 mins.', '1 hour', '17222329830167-file', 10);

INSERT INTO favorites (userId, recipeId) VALUES
-- User 1 favorites
(3, 1), -- User 1 favorites Spaghetti Carbonara
(3, 3), -- User 1 favorites Beef Tacos

-- User 2 favorites
(4, 2), -- User 2 favorites Chicken Curry
(4, 5), -- User 2 favorites Caesar Salad

-- User 3 favorites
(5, 4), -- User 3 favorites Pancakes
(5, 7), -- User 3 favorites Vegetable Stir Fry

-- User 4 favorites
(6, 6), -- User 4 favorites Chocolate Cake
(6, 9), -- User 4 favorites Grilled Salmon

-- User 5 favorites
(7, 8), -- User 5 favorites Tomato Soup
(7, 11); -- User 5 favorites Beef Burger