import React, { useState } from 'react';
import axios from 'axios';

const questionsData = {
  depression: [
    "Have you been feeling hopeless or sad?",
    "Have you lost interest in activities you used to enjoy?",
    "Do you feel tired or have little energy?",
    "Have you experienced changes in appetite or weight?",
    "Do you have trouble sleeping or sleep too much?"
  ],
  stress: [
    "Do you feel overwhelmed by daily tasks?",
    "Do you have difficulty relaxing?",
    "Do you feel irritable or angry frequently?",
    "Do you experience headaches or muscle tension?",
    "Do you have trouble concentrating?"
  ],
  bipolar: [
    "Have you experienced periods of unusually high energy or activity?",
    "Do you have episodes of feeling extremely happy or euphoric?",
    "Have you had times of feeling very irritable or angry?",
    "Do you experience rapid speech or racing thoughts?",
    "Have you engaged in risky behaviors during mood swings?"
  ],
  trauma: [
    "Do you have flashbacks or intrusive memories of a traumatic event?",
    "Do you avoid places or people that remind you of the trauma?",
    "Do you feel constantly on edge or easily startled?",
    "Do you have trouble sleeping or nightmares related to the trauma?",
    "Do you experience feelings of guilt or shame about the event?"
  ]
};

const SelfTest = () => {
  const [consentGiven, setConsentGiven] = useState(false);
  const [testType, setTestType] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleConsent = () => {
    setConsentGiven(true);
  };

  const handleTestSelection = (test) => {
    setTestType(test);
    setAnswers(Array(questionsData[test].length).fill(''));
    setResult(null);
    setError(null);
  };

  const handleAnswerChange = (e, questionIndex) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = e.target.value;
    setAnswers(newAnswers);
  };

  const handleSubmitTest = async (e) => {
    e.preventDefault();
    if (answers.includes('')) {
      alert("Please answer all questions before submitting.");
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/api/selftest', {
        testType,
        answers,
      });
      setResult(response.data.result);
    } catch (err) {
      setError('Failed to submit test. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleRetake = () => {
    setTestType(null);
    setAnswers([]);
    setResult(null);
    setError(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Mental Health Self-Assessment</h1>

      {!consentGiven ? (
        <div className="mb-6">
          <p>Please provide consent to take the test.</p>
          <button
            onClick={handleConsent}
            className="bg-blue-500 text-white py-2 px-4 rounded mt-2"
          >
            I Consent
          </button>
        </div>
      ) : (
        <>
          {!testType ? (
            <div className="space-y-4">
              <button onClick={() => handleTestSelection('depression')} className="bg-green-500 text-white py-2 px-4 rounded">
                Depression Test
              </button>
              <button onClick={() => handleTestSelection('stress')} className="bg-yellow-500 text-white py-2 px-4 rounded">
                Stress Test
              </button>
              <button onClick={() => handleTestSelection('bipolar')} className="bg-blue-500 text-white py-2 px-4 rounded">
                Bipolar Test
              </button>
              <button onClick={() => handleTestSelection('trauma')} className="bg-red-500 text-white py-2 px-4 rounded">
                Trauma Test
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmitTest}>
              <div className="mb-4">
                <h2 className="text-lg font-semibold">
                  {testType.charAt(0).toUpperCase() + testType.slice(1)} Test
                </h2>
                <div className="space-y-4">
                  {questionsData[testType].map((question, index) => (
                    <label key={index} className="block">
                      <span>{index + 1}. {question}</span>
                      <select
                        value={answers[index] || ''}
                        onChange={(e) => handleAnswerChange(e, index)}
                        className="mt-2 border p-2 rounded"
                      >
                        <option value="">Select</option>
                        <option value="yes">Yes</option>
                        <option value="no">No</option>
                      </select>
                    </label>
                  ))}
                </div>
              </div>
              <button type="submit" disabled={loading} className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">
                {loading ? 'Submitting...' : 'Submit Test'}
              </button>
              {error && (
                <p className="mt-4 text-red-600">{error}</p>
              )}
              {result && (
                <div className="mt-6 p-4 border rounded bg-gray-100">
                  <h3 className="text-md font-semibold mb-2">Test Result:</h3>
                  <p>{result}</p>
                  <button
                    onClick={handleRetake}
                    className="mt-4 bg-gray-500 text-white py-2 px-4 rounded"
                  >
                    Retake Test
                  </button>
                </div>
              )}
            </form>
          )}
        </>
      )}
    </div>
  );
};

export default SelfTest;
