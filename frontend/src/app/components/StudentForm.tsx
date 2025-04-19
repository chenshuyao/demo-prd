'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Student, createStudent, updateStudent, getStudentById } from '../api/studentApi';

interface StudentFormProps {
  studentId?: number;
  isEditMode?: boolean;
}

const MAJORS = [
  '计算机',
  '土木工程',
  '理学院',
  '工商管理',
  '电子信息',
  '自动化',
];

export default function StudentForm({ studentId, isEditMode = false }: StudentFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState<Student>({
    name: '',
    gender: '男',
    phone: '',
    age: 18,
    major: '计算机',
    nativePlace: '',
    email: '',
    tag: '',
    remark: '',
  });

  useEffect(() => {
    if (isEditMode && studentId) {
      setLoading(true);
      getStudentById(studentId)
        .then((data) => {
          setFormData(data);
          setLoading(false);
        })
        .catch((err) => {
          setError('Failed to load student data');
          setLoading(false);
          console.error(err);
        });
    }
  }, [isEditMode, studentId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'age' ? parseInt(value, 10) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isEditMode && studentId) {
        await updateStudent(studentId, formData);
      } else {
        await createStudent(formData);
      }
      router.push('/');
    } catch (err) {
      setError('Failed to save student data');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading && isEditMode) {
    return <div className="text-center p-8">Loading...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">
        {isEditMode ? 'Edit Student' : 'Add New Student'}
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              姓名 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              maxLength={64}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              性别 <span className="text-red-500">*</span>
            </label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              <option value="男">男</option>
              <option value="女">女</option>
              <option value="其他">其他</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              电话 <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
              maxLength={16}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              年龄 <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
              min={0}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              专业 <span className="text-red-500">*</span>
            </label>
            <select
              name="major"
              value={formData.major}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
            >
              {MAJORS.map((major) => (
                <option key={major} value={major}>
                  {major}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">籍贯</label>
            <input
              type="text"
              name="nativePlace"
              value={formData.nativePlace || ''}
              onChange={handleChange}
              maxLength={64}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">邮箱</label>
            <input
              type="email"
              name="email"
              value={formData.email || ''}
              onChange={handleChange}
              maxLength={32}
              className="w-full p-2 border rounded"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">标签</label>
            <input
              type="text"
              name="tag"
              value={formData.tag || ''}
              onChange={handleChange}
              maxLength={512}
              className="w-full p-2 border rounded"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">备注</label>
          <textarea
            name="remark"
            value={formData.remark || ''}
            onChange={handleChange}
            maxLength={512}
            rows={3}
            className="w-full p-2 border rounded"
          />
        </div>

        <div className="flex justify-end space-x-4 pt-4">
          <button
            type="button"
            onClick={() => router.push('/')}
            className="px-4 py-2 border rounded"
          >
            取消
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? '保存中...' : '保存'}
          </button>
        </div>
      </form>
    </div>
  );
}
