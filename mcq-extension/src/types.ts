export interface QuestionType {
    id: string;
    data: QuestionData;
  }
  
  export interface QuestionData {
    question: string;
    responses: ResponseType[];
    solutionId: string;
  }
  
  export interface SolutionType {
    id: string;
  }
  
  export interface ResponseType {
    id: string;
    content: string;
    explanation?: string;
  }