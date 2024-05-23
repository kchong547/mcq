export interface Question {
    id: string;
    data: QuestionData;
  }
  
  export interface QuestionData {
    question: string;
    responses: Response[];
    solutionId: string;
  }
  
  export interface Solution {
    id: string;
  }
  
  export interface Response {
    id: string;
    content: string;
    explanation?: string;
  }