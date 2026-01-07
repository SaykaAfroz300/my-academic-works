import React from 'react';

const ActivitySection = ({ patientData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-6">Your Activity</h2>
      
      {/* Quizzes Section */}
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">Quizzes Attempted</h3>
        {patientData.quizzes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patientData.quizzes.map((quiz, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold">{quiz.title}</p>
                    <p className="text-gray-600 text-sm">Completed: {new Date(quiz.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    quiz.score >= 7 ? 'bg-green-100 text-green-800' :
                    quiz.score >= 4 ? 'bg-yellow-100 text-yellow-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    Score: {quiz.score}/10
                  </span>
                </div>
                {quiz.feedback && (
                  <p className="mt-2 text-sm text-gray-700">{quiz.feedback}</p>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No quizzes attempted yet</p>
        )}
      </div>

      {/* Courses Section */}
      <div>
        <h3 className="text-lg font-medium mb-4">Enrolled Courses</h3>
        {patientData.courses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {patientData.courses.map((course, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between">
                  <div>
                    <p className="font-semibold">{course.title}</p>
                    <p className="text-gray-600 text-sm">Enrolled: {new Date(course.date).toLocaleDateString()}</p>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    course.completed ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                  }`}>
                    {course.completed ? 'Completed' : 'In Progress'}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className="bg-blue-600 h-2.5 rounded-full" 
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                  <p className="text-right text-xs mt-1">{course.progress}% complete</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No courses enrolled yet</p>
        )}
      </div>
    </div>
  );
};

export default ActivitySection;
