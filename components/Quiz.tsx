"use client";

import React, { useState } from "react";
import { CheckCircle2, XCircle, AlertCircle, RefreshCcw, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizProps {
  questions: Question[];
}

export function Quiz({ questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="p-4 rounded-xl border border-muted bg-muted/50 text-muted-foreground flex items-center gap-2">
        <AlertCircle className="w-5 h-5" />
        <p>No questions available for this quiz.</p>
      </div>
    );
  }

  const question = questions[currentQuestion];
  const isCorrect = selectedOption === question.correctAnswer;

  const handleSubmit = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setIsFinished(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setIsFinished(false);
  };

  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    return (
      <div className="my-8 p-6 rounded-2xl border bg-card text-card-foreground shadow-sm flex flex-col items-center justify-center text-center space-y-4">
        <h3 className="text-2xl font-bold tracking-tight">Quiz Completed!</h3>
        <div className="relative w-32 h-32 flex items-center justify-center rounded-full bg-muted">
          <span className="text-4xl font-black">{percentage}%</span>
        </div>
        <p className="text-muted-foreground">
          You scored {score} out of {questions.length} questions correctly.
        </p>
        <button
          onClick={handleReset}
          className="mt-4 inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-4 py-2 gap-2"
        >
          <RefreshCcw className="w-4 h-4" />
          Retake Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="my-8 rounded-2xl border bg-card text-card-foreground shadow-sm overflow-hidden">
      {/* Quiz Header */}
      <div className="px-6 py-4 border-b bg-muted/30 flex justify-between items-center">
        <span className="text-sm font-medium text-muted-foreground">
          Question {currentQuestion + 1} of {questions.length}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          Score: {score}
        </span>
      </div>

      {/* Quiz Body */}
      <div className="p-6 space-y-6">
        <h3 className="text-xl font-semibold leading-tight">{question.question}</h3>
        
        <div className="space-y-3">
          {question.options.map((option, index) => {
            const isSelected = selectedOption === index;
            const showCorrect = isSubmitted && index === question.correctAnswer;
            const showIncorrect = isSubmitted && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => !isSubmitted && setSelectedOption(index)}
                disabled={isSubmitted}
                className={cn(
                  "w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all duration-200",
                  !isSubmitted && !isSelected && "hover:border-primary/50 hover:bg-muted/50",
                  !isSubmitted && isSelected && "border-primary bg-primary/10 ring-1 ring-primary",
                  showCorrect && "border-green-500 bg-green-500/10 ring-1 ring-green-500",
                  showIncorrect && "border-red-500 bg-red-500/10 ring-1 ring-red-500",
                  isSubmitted && !showCorrect && !showIncorrect && "opacity-50 cursor-not-allowed"
                )}
              >
                <span className={cn("font-medium", showCorrect && "text-green-600 dark:text-green-400", showIncorrect && "text-red-600 dark:text-red-400")}>
                  {option}
                </span>
                {showCorrect && <CheckCircle2 className="w-5 h-5 text-green-500" />}
                {showIncorrect && <XCircle className="w-5 h-5 text-red-500" />}
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isSubmitted && question.explanation && (
          <div className={cn(
            "p-4 rounded-xl text-sm",
            isCorrect ? "bg-green-500/10 text-green-800 dark:text-green-200" : "bg-primary/10 text-primary-foreground dark:text-primary-foreground/90"
          )}>
            <p className="font-semibold mb-1">{isCorrect ? "Correct!" : "Incorrect."}</p>
            <p>{question.explanation}</p>
          </div>
        )}
      </div>

      {/* Quiz Footer */}
      <div className="px-6 py-4 border-t bg-muted/30 flex justify-end">
        {!isSubmitted ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === null}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Submit Answer
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring bg-primary text-primary-foreground shadow hover:bg-primary/90 h-10 px-6 gap-2"
          >
            {currentQuestion < questions.length - 1 ? "Next Question" : "Finish Quiz"}
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}
