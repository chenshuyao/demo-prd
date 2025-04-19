package com.chenshuyao.demo.service;

import com.chenshuyao.demo.model.Student;
import com.chenshuyao.demo.repository.StudentRepository;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

/**
 * Service class for Student entity.
 */
@Service
public class StudentService {

  private final StudentRepository studentRepository;

  @Autowired
  public StudentService(StudentRepository studentRepository) {
    this.studentRepository = studentRepository;
  }

  /**
   * Get all students with pagination.
   *
   * @param pageable pagination information
   * @return page of students
   */
  public Page<Student> getAllStudents(Pageable pageable) {
    return studentRepository.findByIsDelete(0, pageable);
  }

  /**
   * Get student by id.
   *
   * @param id student id
   * @return student if found
   */
  public Optional<Student> getStudentById(Long id) {
    return studentRepository.findById(id);
  }

  /**
   * Create a new student.
   *
   * @param student student to create
   * @return created student
   */
  public Student createStudent(Student student) {
    student.setCreateTime(LocalDateTime.now());
    student.setModifyTime(LocalDateTime.now());
    student.setIsDelete(0);
    student.setCreator(1L); // Default creator ID
    return studentRepository.save(student);
  }

  /**
   * Update an existing student.
   *
   * @param id      student id
   * @param student updated student data
   * @return updated student if found
   */
  public Optional<Student> updateStudent(Long id, Student student) {
    return studentRepository.findById(id)
        .map(existingStudent -> {
          student.setId(id);
          student.setCreateTime(existingStudent.getCreateTime());
          student.setModifyTime(LocalDateTime.now());
          student.setIsDelete(existingStudent.getIsDelete());
          student.setCreator(existingStudent.getCreator());
          return studentRepository.save(student);
        });
  }

  /**
   * Delete a student (soft delete).
   *
   * @param id student id
   * @return true if deleted successfully
   */
  public boolean deleteStudent(Long id) {
    return studentRepository.findById(id)
        .map(student -> {
          student.setIsDelete(1);
          student.setModifyTime(LocalDateTime.now());
          studentRepository.save(student);
          return true;
        })
        .orElse(false);
  }

  /**
   * Search students by keyword.
   *
   * @param keyword  search keyword
   * @param pageable pagination information
   * @return page of students
   */
  public Page<Student> searchStudents(String keyword, Pageable pageable) {
    return studentRepository.searchByKeyword(keyword, 0, pageable);
  }

  /**
   * Search students by name.
   *
   * @param name     name to search
   * @param pageable pagination information
   * @return page of students
   */
  public Page<Student> searchByName(String name, Pageable pageable) {
    return studentRepository.findByNameContainingAndIsDelete(name, 0, pageable);
  }

  /**
   * Search students by phone.
   *
   * @param phone    phone to search
   * @param pageable pagination information
   * @return page of students
   */
  public Page<Student> searchByPhone(String phone, Pageable pageable) {
    return studentRepository.findByPhoneContainingAndIsDelete(phone, 0, pageable);
  }
}
