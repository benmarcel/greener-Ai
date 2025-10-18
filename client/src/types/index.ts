export interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  climateZone: string;
  points: number;
  level: number;
  badges: string[];
  joinedDate: string;
  lastActive: string;
}
export interface newUser {
    name: string;
    email: string;
    password: string;
    location: string;
    climateZone: string;
}
export interface Action {
  _id: string;
  userId: string | User;
  actionType: 'composting' | 'planting' | 'recycling' | 'water_saving';
  title: string;
  description: string;
  points: number;
  impactMetric: {
    co2Saved: number;
    waterSaved: number;
    treesPlanted: number;
  };
  imageUrl?: string;
  date: string;
  verified: boolean;
  createdAt?: string;
}

export interface Tip {
  _id: string;
  authorId: string | User;
  title: string;
  content: string;
  category: 'soil' | 'composting' | 'pests' | 'climate' | 'water';
  tags: string[];
  likes: number;
  likedBy: string[];
  comments: Comment[];
  isAIGenerated: boolean;
  createdAt: string;
}

export interface Comment {
  userId: string | User;
  text: string;
  date: string;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}

export interface DashboardStats {
  user: User;
  stats: {
    totalPoints: number;
    level: number;
    totalActions: number;
    totalTips: number;
    totalImpact: {
      co2Saved: number;
      waterSaved: number;
      treesPlanted: number;
    };
  };
  recentActions: Action[];
}

export interface CommunityStats {
  totalUsers: number;
  totalActions: number;
  totalTips: number;
  communityImpact: {
    co2Saved: number;
    waterSaved: number;
    treesPlanted: number;
  };
}

export interface LeaderboardUser {
  _id: string;
  name: string;
  location: string;
  points: number;
  level: number;
  badges: string[];
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface Recommendation {
  title: string;
  description: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  impact: 'Low' | 'Medium' | 'High';
  points: number;
}

// export interface IUser {
//   _id: string;
//   name: string;
//   location: string;
// }

// export interface IAction {
//   _id: string;
//   title: string;
//   description: string;
//   date: string;
//   userId: IUser;
// }

export interface IPagination {
  currentPage: number;
  totalPages: number;
  totalActions: number;
  hasMore?: boolean;
}
export interface TipPagination {
  currentPage: number;
  totalPages: number;
  totalTips: number;
 
}
export interface GetAllTipsSuccess {
  tips: Tip[];
  pagination: TipPagination;
}

// Successful response
export interface IGetAllActionsSuccess {
  actions: Action[];
  pagination: IPagination;
}

// // Error response
// export interface ErrorResponse {
//   message: string;
//   error?: string;
// }

// // Union type for overall response
// export type GetAllActionsResponse = IGetAllActionsSuccess | ErrorResponse;


