import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { 
  ClipboardDocumentListIcon,
  CheckCircleIcon,
  ArrowPathIcon,
  BookOpenIcon,
  BeakerIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
  CakeIcon
} from '@heroicons/react/24/outline';
import { toast } from 'react-toastify';
import { db } from '../firebase.js'; // Ensure the correct path to firebase.js
import { collection, addDoc } from 'firebase/firestore';

const BASE_URL = 'http://localhost:5000';

const FEATURES = [
  { key: 'Glucose', label: 'Glucose' },
  { key: 'Insulin', label: 'Insulin' },
  { key: 'BP_Systolic', label: 'Systolic BP' },
  { key: 'Cholesterol', label: 'Cholesterol' },
  { key: 'Triglycerides', label: 'Triglycerides' },
  { key: 'BMI', label: 'BMI' }
];

function Recommendation() {
  const [model, setModel] = useState('');
  const [inputData, setInputData] = useState({});
  const [customPrompt, setCustomPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [diet, setDiet] = useState('');
  const [aiAdvice, setAiAdvice] = useState('');
  const [models, setModels] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`${BASE_URL}/get_models`)
      .then(response => {
        const rModels = response.data.r_models;
        setModels(rModels);
        if (rModels && rModels.length > 0) {
          setModel(rModels[0]);
        }
      })
      .catch(err => {
        console.error(err);
        setError('Failed to fetch models.');
      });
  }, []);

  const handleInputChange = (feature, value) => {
    setInputData(prev => ({
      ...prev,
      [feature]: value,
    }));
  };

  const handleRecommend = async () => {
    setLoading(true);
    setError('');
    try {
      const payload = {
        ...inputData,
        model,
        customPrompt,
      };
      const response = await axios.post(`${BASE_URL}/recommend`, payload);
      setDiet(response.data.diet);
      setAiAdvice(response.data.ai_advice);
       // Save the recommendation to Firestore
    await addDoc(collection(db, "nutrition_recommendations"), {
      model,
      inputData,
      customPrompt,
      diet: response.data.diet,
      aiAdvice: response.data.ai_advice,
      timestamp: new Date()
    });
      toast.success('Nutrition plan generated successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to create plan. Please verify inputs and try again.');
      toast.error('Plan generation failed');
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInputData({});
    setCustomPrompt('');
    setDiet('');
    setAiAdvice('');
    setError('');
    toast.info('Form reset successfully');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-emerald-50 to-cyan-50 flex items-center justify-center p-6">
      <div className="w-full max-w-4xl mx-auto bg-white p-8 rounded-[28px] shadow-2xl border border-emerald-100 transition-all duration-300 hover:shadow-lg">
        <div className="text-center mb-8 space-y-4">
          <div className="inline-flex items-center justify-center bg-emerald-100 p-4 rounded-full">
            <CakeIcon className="w-12 h-12 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800">
            Personalized Nutrition Planner
            <span className="block text-lg font-normal text-gray-500 mt-2">AI-Driven Dietary Optimization</span>
          </h1>
        </div>

        {/* Model Selection */}
        <div className="mb-6 group">
          <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center space-x-2">
            <BeakerIcon className="w-5 h-5 text-emerald-500" />
            <span>Analysis Engine</span>
          </label>
          <div className="relative">
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none appearance-none bg-white text-gray-700"
            >
              {models.map((m) => (
                <option key={m} value={m}>
                  {m.charAt(0).toUpperCase() + m.slice(1)}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        {/* Biomarker Inputs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {FEATURES.map((feature) => (
            <div key={feature.key} className="space-y-1">
              <label className="text-sm font-medium text-gray-600">{feature.label}</label>
              <div className="relative">
                <input
                  type="number"
                  onChange={(e) => handleInputChange(feature.key, e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none bg-gray-50 text-gray-700 placeholder-gray-400 pr-12"
                  placeholder="–"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-gray-400">
                  {feature.key === 'BMI' ? 'kg/m²' : feature.key === 'BP_Systolic' ? 'mmHg' : 'mg/dL'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Preferences */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-600 mb-2 flex items-center space-x-2">
            <ClipboardDocumentListIcon className="w-5 h-5 text-emerald-500" />
            <span>Dietary Preferences (Not mandatory input)</span>
          </label>
          <textarea
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 transition-all outline-none bg-gray-50 text-gray-700 placeholder-gray-400"
            placeholder="Example: Lactose intolerant, prefer plant-based proteins..."
            rows="3"
          />
        </div>

        {/* Action Section */}
        <div className="space-y-4">
          <button
            onClick={handleRecommend}
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-600 hover:to-cyan-600 text-white font-semibold py-3.5 px-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02] shadow-lg disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center space-x-2"
          >
            {loading ? (
              <>
                <ArrowPathIcon className="w-5 h-5 animate-spin" />
                <span>Analyzing Biomarkers...</span>
              </>
            ) : (
              <>
                <ShieldCheckIcon className="w-5 h-5" />
                <span>Generate Meal Plan</span>
              </>
            )}
          </button>

          {error && (
            <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-2 animate-fade-in">
              <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
              <p className="text-red-600">{error}</p>
            </div>
          )}

          {diet && (
            <div className="mt-6 space-y-4 animate-fade-in-up">
              <div className={`p-4 rounded-xl border ${
                diet.includes('High Carb') 
                  ? 'bg-amber-50 border-amber-200' 
                  : 'bg-emerald-50 border-emerald-200'
              } flex items-center space-x-2`}>
                <CheckCircleIcon className={`w-5 h-5 ${
                  diet.includes('High Carb') ? 'text-amber-500' : 'text-emerald-500'
                }`} />
                <span className={`font-semibold ${
                  diet.includes('High Carb') ? 'text-amber-700' : 'text-emerald-700'
                }`}>
                  Recommended Diet: {diet}
                </span>
              </div>
              
              {aiAdvice && (
                <div className="p-4 bg-cyan-50 border border-cyan-200 rounded-xl">
                  <div className="flex items-center space-x-2 mb-3">
                    <BookOpenIcon className="w-5 h-5 text-cyan-600" />
                    <h3 className="text-sm font-semibold text-cyan-600">NUTRITIONIST'S ANALYSIS</h3>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{aiAdvice}</p>
                </div>
              )}
            </div>
          )}

          <button
            onClick={handleClear}
            className="w-full text-gray-600 hover:text-gray-800 font-medium py-3 px-6 rounded-xl transition-colors flex items-center justify-center space-x-2 group"
          >
            <ArrowPathIcon className="w-5 h-5 text-gray-500 group-hover:rotate-180 transition-transform" />
            <span>Reset Planner</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Recommendation;