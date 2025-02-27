import React from 'react';

const Analytics = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Analytics</h2>

      <div className="flex justify-end space-x-2">
        {['Week', 'Month', '3 Months', 'Year'].map((range) => (
          <button
            key={range}
            className={`px-3 py-1 rounded-md ${range === 'Month'
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 hover:bg-gray-200'
              }`}
          >
            {range}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Posture Score Trends</h3>
          <div className="h-60 w-full bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder: Posture score over time</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Activity Distribution</h3>
          <div className="h-60 w-full bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder: Activity types pie chart</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Posture Issues</h3>
          <div className="space-y-3">
            {[
              { issue: "Forward Head", percentage: 42 },
              { issue: "Rounded Shoulders", percentage: 28 },
              { issue: "Pelvic Tilt", percentage: 18 },
              { issue: "Other Issues", percentage: 12 },
            ].map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.issue}</span>
                  <span>{item.percentage}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${item.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Session Duration</h3>
          <div className="h-40 w-full bg-gray-100 rounded flex items-center justify-center">
            <p className="text-gray-500">Chart placeholder: Duration bars</p>
          </div>
          <div className="mt-3">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Average Duration</span>
              <span className="font-semibold">18 minutes</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-lg font-semibold mb-4">Improvement Rate</h3>
          <div className="flex flex-col items-center justify-center h-40">
            <div className="relative w-32 h-32">
              <div className="w-32 h-32 rounded-full bg-gray-100"></div>
              <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
                <span className="text-3xl font-bold">+23%</span>
              </div>
            </div>
            <p className="text-gray-600 text-sm mt-2">vs. previous month</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;