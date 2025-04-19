package com.chenshuyao.demo.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Student entity class representing the student information.
 */
@Entity
@Table(name = "students")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Student {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private Long userId;

  @NotBlank(message = "Name is required")
  @Size(max = 64, message = "Name must be less than 64 characters")
  private String name;

  @NotBlank(message = "Gender is required")
  @Size(max = 8, message = "Gender must be less than 8 characters")
  private String gender;

  @NotBlank(message = "Phone is required")
  @Size(max = 16, message = "Phone must be less than 16 characters")
  private String phone;

  @NotNull(message = "Age is required")
  @Min(value = 0, message = "Age must be a positive number")
  private Integer age;

  @Size(max = 64, message = "Native place must be less than 64 characters")
  private String nativePlace;

  @NotBlank(message = "Major is required")
  @Size(max = 128, message = "Major must be less than 128 characters")
  private String major;

  @Email(message = "Email should be valid")
  @Size(max = 32, message = "Email must be less than 32 characters")
  private String email;

  @Size(max = 512, message = "Tag must be less than 512 characters")
  private String tag;

  @Size(max = 512, message = "Remark must be less than 512 characters")
  private String remark;

  private LocalDateTime createTime;

  private LocalDateTime modifyTime;

  private Integer isDelete;

  private Long creator;
}
