package com.chenshuyao.demo.controller;

import com.chenshuyao.demo.model.Student;
import com.chenshuyao.demo.service.StudentService;
import jakarta.validation.Valid;
import java.util.HashMap;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST Controller for Student entity.
 */
@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins = "http://localhost:3000")
public class StudentController {

  private final StudentService studentService;

  @Autowired
  public StudentController(StudentService studentService) {
    this.studentService = studentService;
  }

  /**
   * Get all students with pagination.
   *
   * @param page  page number (0-based)
   * @param size  page size
   * @param sort  sort field
   * @param order sort direction
   * @return page of students
   */
  @GetMapping
  public ResponseEntity<Map<String, Object>> getAllStudents(
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size,
      @RequestParam(defaultValue = "id") String sort,
      @RequestParam(defaultValue = "asc") String order) {

    Sort.Direction direction = "desc".equalsIgnoreCase(order) ? Sort.Direction.DESC : Sort.Direction.ASC;
    Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sort));
    Page<Student> studentPage = studentService.getAllStudents(pageable);

    Map<String, Object> response = new HashMap<>();
    response.put("students", studentPage.getContent());
    response.put("currentPage", studentPage.getNumber());
    response.put("totalItems", studentPage.getTotalElements());
    response.put("totalPages", studentPage.getTotalPages());

    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  /**
   * Get student by id.
   *
   * @param id student id
   * @return student if found
   */
  @GetMapping("/{id}")
  public ResponseEntity<Student> getStudentById(@PathVariable Long id) {
    return studentService.getStudentById(id)
        .map(student -> new ResponseEntity<>(student, HttpStatus.OK))
        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  /**
   * Create a new student.
   *
   * @param student student to create
   * @return created student
   */
  @PostMapping
  public ResponseEntity<Student> createStudent(@Valid @RequestBody Student student) {
    Student createdStudent = studentService.createStudent(student);
    return new ResponseEntity<>(createdStudent, HttpStatus.CREATED);
  }

  /**
   * Update an existing student.
   *
   * @param id      student id
   * @param student updated student data
   * @return updated student if found
   */
  @PutMapping("/{id}")
  public ResponseEntity<Student> updateStudent(@PathVariable Long id, @Valid @RequestBody Student student) {
    return studentService.updateStudent(id, student)
        .map(updatedStudent -> new ResponseEntity<>(updatedStudent, HttpStatus.OK))
        .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
  }

  /**
   * Delete a student (soft delete).
   *
   * @param id student id
   * @return success status
   */
  @DeleteMapping("/{id}")
  public ResponseEntity<HttpStatus> deleteStudent(@PathVariable Long id) {
    boolean deleted = studentService.deleteStudent(id);
    return deleted
        ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
        : new ResponseEntity<>(HttpStatus.NOT_FOUND);
  }

  /**
   * Search students by keyword.
   *
   * @param keyword search keyword
   * @param page    page number (0-based)
   * @param size    page size
   * @return page of students
   */
  @GetMapping("/search")
  public ResponseEntity<Map<String, Object>> searchStudents(
      @RequestParam String keyword,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {

    Pageable pageable = PageRequest.of(page, size);
    Page<Student> studentPage = studentService.searchStudents(keyword, pageable);

    Map<String, Object> response = new HashMap<>();
    response.put("students", studentPage.getContent());
    response.put("currentPage", studentPage.getNumber());
    response.put("totalItems", studentPage.getTotalElements());
    response.put("totalPages", studentPage.getTotalPages());

    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  /**
   * Search students by name.
   *
   * @param name search name
   * @param page page number (0-based)
   * @param size page size
   * @return page of students
   */
  @GetMapping("/search/name")
  public ResponseEntity<Map<String, Object>> searchByName(
      @RequestParam String name,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {

    Pageable pageable = PageRequest.of(page, size);
    Page<Student> studentPage = studentService.searchByName(name, pageable);

    Map<String, Object> response = new HashMap<>();
    response.put("students", studentPage.getContent());
    response.put("currentPage", studentPage.getNumber());
    response.put("totalItems", studentPage.getTotalElements());
    response.put("totalPages", studentPage.getTotalPages());

    return new ResponseEntity<>(response, HttpStatus.OK);
  }

  /**
   * Search students by phone.
   *
   * @param phone search phone
   * @param page  page number (0-based)
   * @param size  page size
   * @return page of students
   */
  @GetMapping("/search/phone")
  public ResponseEntity<Map<String, Object>> searchByPhone(
      @RequestParam String phone,
      @RequestParam(defaultValue = "0") int page,
      @RequestParam(defaultValue = "10") int size) {

    Pageable pageable = PageRequest.of(page, size);
    Page<Student> studentPage = studentService.searchByPhone(phone, pageable);

    Map<String, Object> response = new HashMap<>();
    response.put("students", studentPage.getContent());
    response.put("currentPage", studentPage.getNumber());
    response.put("totalItems", studentPage.getTotalElements());
    response.put("totalPages", studentPage.getTotalPages());

    return new ResponseEntity<>(response, HttpStatus.OK);
  }
}
