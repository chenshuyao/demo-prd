'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Student, getStudentById, deleteStudent } from '../api/studentApi';

interface StudentDetailProps {
  studentId: number;
}

export default function StudentDetail({ studentId }: StudentDetailProps) {
  const router = useRouter();
  const [student, setStudent] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    getStudentById(studentId)
      .then((data) => {
        setStudent(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load student data');
        setLoading(false);
        console.error(err);
      });
  }, [studentId]);

  const handleDelete = async () => {
    if (!window.confirm('确定要删除这条记录吗？')) {
      return;
    }

    try {
      await deleteStudent(studentId);
      router.push('/');
    } catch (err) {
      setError('Failed to delete student');
      console.error(err);
    }
  };

  if (loading) {
    return <div className="text-center p-8">Loading...</div>;
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
        <div className="text-center">
          <Link href="/" className="text-blue-500 hover:underline">
            返回列表
          </Link>
        </div>
      </div>
    );
  }

  if (!student) {
    return (
      <div className="max-w-2xl mx-auto p-4">
        <div className="text-center p-8 bg-gray-50 rounded">学生不存在</div>
        <div className="text-center mt-4">
          <Link href="/" className="text-blue-500 hover:underline">
            返回列表
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">学生详情</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6">
          <div>
            <p className="text-sm text-gray-500">姓名</p>
            <p className="font-medium">{student.name}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">性别</p>
            <p className="font-medium">{student.gender}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">电话</p>
            <p className="font-medium">{student.phone}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">年龄</p>
            <p className="font-medium">{student.age}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">专业</p>
            <p className="font-medium">{student.major}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">籍贯</p>
            <p className="font-medium">{student.nativePlace || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">邮箱</p>
            <p className="font-medium">{student.email || '-'}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">标签</p>
            <p className="font-medium">{student.tag || '-'}</p>
          </div>
        </div>

        {student.remark && (
          <div className="border-t p-6">
            <p className="text-sm text-gray-500 mb-2">备注</p>
            <p className="whitespace-pre-line">{student.remark}</p>
          </div>
        )}

        <div className="border-t p-6 bg-gray-50 flex justify-end space-x-4">
          <Link
            href="/"
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            返回列表
          </Link>
          <Link
            href={`/students/${studentId}/edit`}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            编辑
          </Link>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  );
}
