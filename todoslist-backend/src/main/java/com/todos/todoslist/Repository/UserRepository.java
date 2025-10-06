package com.todos.todoslist.Repository;

import com.todos.todoslist.Model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // Only fetch by username, compare password manually in controller
    Optional<User> findByUsername(String username);

    boolean existsByUsername(String username); // For registration check
}
