-- Add a new column to the UserProfile table
ALTER TABLE UserProfile ADD ActiveStatus VARCHAR(255);

-- Update the ActiveStatus value to "Active" for all rows in the UserProfile table
UPDATE UserProfile SET ActiveStatus = 'Active';

-- Display all the rows in the UserProfile table
SELECT * FROM UserProfile;