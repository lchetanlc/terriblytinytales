import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import './App.css'
const App = () => {
  const [showGraph, setShowGraph] = useState(false);

  const handleButtonClick = () => {
    setShowGraph(true);
  };
  const SubmitPage = ({ onButtonClick }) => {
    return (
      <div className="container">
       <div className="button_container">
        <p className="description"> React Word Frequency Analyser.
        
        </p>
        <button className="btn" onClick={onButtonClick}><span>Submit !</span></button>
      </div>
      </div>
    );
  };
  const GraphPage = () => {
    const [words, setWords] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      fetchWordData();
    }, []);

    const fetchWordData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://www.terriblytinytales.com/test.txt');
        const text = await response.text();

        const wordList = text.split(/\s+/);
        const wordFrequency = {};

        wordList.forEach((word) => {
          wordFrequency[word] = (wordFrequency[word] || 0) + 1;
        });

        const sortedWords = Object.entries(wordFrequency).sort((a, b) => b[1] - a[1]);

        setWords(sortedWords.slice(0, 20));
        setLoading(false);
      } catch (error) {
        console.error('Error fetching word data:', error);
        setLoading(false);
      }
    };

    const exportCSV = () => {
      const csvContent = [
        ['Word', 'Frequency'],
        ...words.map(([word, frequency]) => [word, frequency]),
      ]
        .map((row) => row.join(','))
        .join('\n');

      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);

      link.href = url;
      link.setAttribute('download', 'word_frequency.csv');
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const chartData = {
      labels: words.map(([word]) => word),
      datasets: [
        {
          label: 'Word Frequency',
          data: words.map(([, frequency]) => frequency),
          backgroundColor: 'rgba(68, 126, 203, 1)',
        },
      ],
    };

    const chartOptions = {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          stepSize: 1,
        },
      },
    };

    return (
      <div className="container">

        <div className="chart-container">
          <Bar data={chartData} options={chartOptions} />
        </div>
        <div className="button-group">
          <div> <a className="btn-slide" onClick={exportCSV}>
            <span className="circle">
              <i className="fa fa-save"></i>
            </span>
            <span className="title" >Export Csv</span>
            <span className="title title-hover">Download Now</span>
          </a> </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {!showGraph ? (
        <SubmitPage onButtonClick={handleButtonClick} />
      ) : (
        <GraphPage />
      )}
    </div>
  );
};

export default App;