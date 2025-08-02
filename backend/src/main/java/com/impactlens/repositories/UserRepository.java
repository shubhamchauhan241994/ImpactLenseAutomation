package com.impactlens.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.impactlens.entities.User;

@Repository
public interface UserRepository extends JpaRepository<User, UUID> {
    
    /**
     * Find user by username
     */
    Optional<User> findByUsername(String username);
    
    /**
     * Find user by email
     */
    Optional<User> findByEmail(String email);
    
    /**
     * Check if user exists by username
     */
    boolean existsByUsername(String username);
    
    /**
     * Check if user exists by email
     */
    boolean existsByEmail(String email);
    
    /**
     * Find active users only
     */
    @Query("SELECT u FROM User u WHERE u.isActive = true")
    Iterable<User> findActiveUsers();
    
    /**
     * Find users by role
     */
    @Query("SELECT u FROM User u WHERE u.role = :role")
    Iterable<User> findByRole(@Param("role") User.UserRole role);
    
    /**
     * Find user by username and check if active
     */
    @Query("SELECT u FROM User u WHERE u.username = :username AND u.isActive = true")
    Optional<User> findActiveUserByUsername(@Param("username") String username);
} 