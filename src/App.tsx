import { useState, useEffect } from 'react';
// import { ChevronRight } from 'lucide-react'

const InsertionSortVisualization = () => {
  const [array, setArray] = useState([5, 2, 4, 6, 1, 3]);
  const [step, setStep] = useState(0);
  const [sortedIndex, setSortedIndex] = useState<number | null>(null);
  const [currentKey, setCurrentKey] = useState<number | null>(null);
  const [comparing, setComparing] = useState<number | null>(null);

  const steps = [
    { description: "Initial array", sortedIndex: 0 },
    { description: "Consider 2", sortedIndex: 1, key: 2, comparing: 0 },
    { description: "Swap 5 and 2", sortedIndex: 1, key: 2 },
    { description: "Consider 4", sortedIndex: 2, key: 4, comparing: 1 },
    { description: "4 > 2, so keep 4 here", sortedIndex: 2 },
    { description: "Consider 6", sortedIndex: 3, key: 6, comparing: 2 },
    { description: "6 > 4, so keep 6 here", sortedIndex: 3 },
    { description: "Consider 1", sortedIndex: 4, key: 1, comparing: 3 },
    { description: "Shift 6", sortedIndex: 4, key: 1, comparing: 2 },
    { description: "Shift 4", sortedIndex: 4, key: 1, comparing: 1 },
    { description: "Shift 2", sortedIndex: 4, key: 1, comparing: 0 },
    { description: "Insert 1 at the beginning", sortedIndex: 4 },
    { description: "Consider 3", sortedIndex: 5, key: 3, comparing: 4 },
    { description: "Shift 4", sortedIndex: 5, key: 3, comparing: 3 },
    { description: "Shift 2", sortedIndex: 5, key: 3, comparing: 2 },
    { description: "Insert 3 after 2", sortedIndex: 5 },
    { description: "Array is now sorted", sortedIndex: 5 }
  ];

  useEffect(() => {
    if (step < steps.length) {
      const currentStep = steps[step];
      setSortedIndex(currentStep.sortedIndex);
      setCurrentKey(currentStep.key ?? null);
      setComparing(currentStep.comparing ?? null);

      if (step > 0) {
        const newArray = [...array];
        if (currentStep.key !== undefined) {
          if (currentStep.comparing !== undefined) {
            if (newArray[currentStep.comparing] > currentStep.key) {
              newArray[currentStep.comparing + 1] = newArray[currentStep.comparing];
            } else {
              newArray[currentStep.comparing + 1] = currentStep.key;
            }
          } else {
            let j = currentStep.sortedIndex - 1;
            while (j >= 0 && newArray[j] > currentStep.key) {
              newArray[j + 1] = newArray[j];
              j--;
            }
            newArray[j + 1] = currentStep.key;
          }
        }
        setArray(newArray);
      }
    }
  }, [step]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Insertion Sort Visualization</h2>
      <div className="flex justify-center mb-4">
        {array.map((num, index) => (
          <div
            key={index}
            className={`w-12 h-12 flex items-center justify-center border border-gray-300 m-1 ${
              index <= (sortedIndex ?? -1) ? 'bg-green-200' : ''
            } ${index === comparing ? 'bg-yellow-200' : ''} ${
              num === currentKey ? 'bg-blue-200' : ''
            }`}
          >
            {num}
          </div>
        ))}
      </div>
      <p className="mb-4">{steps[step]?.description}</p>
      <div className="flex justify-between">
        <button
          onClick={() => setStep(Math.max(0, step - 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          disabled={step === 0}
        >
          Previous
        </button>
        <button
          onClick={() => setStep(Math.min(steps.length - 1, step + 1))}
          className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300"
          disabled={step === steps.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default InsertionSortVisualization;