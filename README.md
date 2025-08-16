# Business Acquisition Platform

A revolutionary business acquisition platform that flips the traditional M&A approach by empowering sellers to initiate contact with qualified buyers, similar to Bumble's matching model. The platform streamlines the entire acquisition process with AI-powered tools, comprehensive matching systems, and intuitive workflows.

## 🚀 Live Demo

**🌐 Deployed Application**: [Business Acquisition Platform](https://business-acquisition-p-git-3c68fa-vrikster30-gmailcoms-projects.vercel.app)

## 🚀 Features

### Core Functionality
- **Seller-First Matching**: Sellers browse and connect with qualified buyers, reversing the traditional M&A dynamic
- **Dual Onboarding System**: Separate, comprehensive questionnaires for buyers and sellers
- **AI-Powered Document Analysis**: Advanced document processing and business analysis tools
- **Deal Management Dashboard**: Complete workflow management for acquisition processes
- **Smart Matching Algorithm**: Intelligent compatibility scoring between buyers and sellers

### For Sellers
- **Business Profile Creation**: Comprehensive business listing with financials and details
- **Buyer Discovery**: Browse qualified buyer profiles with detailed investment criteria
- **Match Management**: Track connections, conversations, and deal progress
- **AI Business Analysis**: Analyze your own documents to prepare for sale
- **Deal Tracking**: Monitor acquisition progress through structured workflows

### For Buyers
- **Investment Profile Setup**: Define acquisition criteria and investment preferences
- **Business Discovery**: Browse available businesses with smart filtering
- **Matching Interface**: Like/pass system for efficient business evaluation
- **Due Diligence Tools**: Access to seller-provided documents and analysis

### AI-Powered Tools
- **Document Analysis**: Upload and analyze financial statements, contracts, and business documents
- **Risk Assessment**: Automated risk scoring and identification of potential issues
- **Financial Insights**: Revenue analysis, profitability assessment, and growth projections
- **Recommendations**: AI-generated suggestions for deal optimization

## 🛠 Technology Stack

- **Framework**: Next.js 15 with App Router
- **Architecture**: Server/Client component separation for optimal performance
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: shadcn/ui component library
- **Typography**: Space Grotesk (headings) + DM Sans (body)
- **State Management**: React hooks with localStorage persistence
- **File Processing**: Client-side document upload and analysis simulation
- **Routing**: File-based routing with dynamic routes and async params support

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Getting Started

1. **Clone the repository**
   \`\`\`bash
   git clone <repository-url>
   cd business-acquisition-platform
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

## 🎯 Usage Guide

### Getting Started
1. **Visit the Homepage**: Explore the platform overview and features
2. **Try AI Analysis**: Click "Try AI Analysis" to test document processing capabilities
3. **Choose Your Role**: Select either "Buyer" or "Seller" during onboarding

### For Sellers
1. **Complete Seller Onboarding**: Provide business details, financials, and sale preferences
2. **Access Seller Dashboard**: Browse qualified buyer profiles
3. **Use Matching Interface**: Pass (✕) or Match (❤️) with potential buyers
4. **Manage Matches**: View connected buyers and their contact information
5. **Analyze Your Business**: Use AI tools to prepare documents and optimize your listing

### For Buyers  
1. **Complete Buyer Onboarding**: Define investment criteria and preferences
2. **Access Buyer Dashboard**: Browse available businesses for acquisition
3. **Use Matching Interface**: Like or pass on business opportunities
4. **View Business Details**: Access comprehensive business profiles and metrics

### AI Document Analysis
1. **Upload Documents**: Drag and drop or select financial statements, contracts, or business documents
2. **Processing**: Watch real-time analysis progress and confidence scoring
3. **Review Results**: Explore detailed insights across multiple analysis categories
4. **Export Reports**: Generate PDF summaries and recommendations

## 📁 Project Structure

\`\`\`
├── app/
│   ├── page.tsx                    # Homepage
│   ├── onboarding/                 # User onboarding flows
│   │   ├── page.tsx               # Role selection
│   │   ├── buyer/                 # Buyer onboarding
│   │   └── seller/                # Seller onboarding
│   ├── dashboard/
│   │   ├── buyer/                 # Buyer dashboard and features
│   │   └── seller/                # Seller dashboard and matching
│   ├── deals/[id]/                # Deal management system
│   │   ├── page.tsx               # Deal overview and management
│   │   └── ai-analysis/           # AI analysis for specific deals
│   │       ├── page.tsx           # Server component wrapper
│   │       └── ai-analysis-client.tsx # Client-side AI analysis
│   ├── buyer/[id]/                # Buyer profile pages
│   │   ├── page.tsx               # Server component wrapper
│   │   └── buyer-profile-client.tsx # Client-side buyer profile
│   └── ai-analysis/demo/          # Standalone AI analysis demo
├── components/
│   └── ui/                        # shadcn/ui components (Button, Card, Badge, etc.)
├── public/                        # Static assets and test files
└── README.md
\`\`\`

## 🏗 Architecture & Performance

### Next.js 15 Optimizations
- **Server/Client Component Separation**: Optimized rendering with server components handling async operations
- **Async Params Support**: Modern Next.js 15 routing with Promise-based params
- **Type Safety**: Full TypeScript support with strict type checking
- **Build Optimization**: Clean builds with no unused components or dependencies

### Component Architecture
- **UI Components**: Reusable shadcn/ui components for consistent design
- **Page Components**: Server components for data fetching and routing
- **Client Components**: Interactive components with state management
- **Clean Structure**: Removed unused components for optimal bundle size

## 🔧 Key Features Deep Dive

### Matching Algorithm
- Compatibility scoring based on investment criteria, business metrics, and preferences
- Real-time filtering and recommendation engine
- Persistent state management across sessions

### AI Document Analysis
- Multi-format document support (PDF, Excel, Word, images)
- Real-time processing simulation with progress tracking
- Comprehensive analysis across financial, legal, operational, and risk dimensions
- Exportable reports and insights

### Deal Management
- Structured workflow with milestone tracking
- Document sharing and collaboration tools
- Communication history and task management
- Progress analytics and completion metrics
