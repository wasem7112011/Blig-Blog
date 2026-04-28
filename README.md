# Blig Blog 📝

A minimal personal blog application built with Next.js 16 and Tailwind CSS 4.  
All data is stored in localStorage - no backend or database required.

## ✨ Features

- **Collections**: Organize posts into Personal, Ideas, Diary, or Work
- **Real-time Search**: Instantly filter posts by title or content
- **Trash with Auto-delete**: Deleted posts are stored for 10 days then permanently removed
- **Dark/Light Mode**: Toggle themes with cross-tab synchronization
- **Responsive Design**: Mobile-friendly with collapsible sidebar
- **Auto-save**: Everything saves automatically to localStorage
- **Zero Configuration**: No API keys, no database setup needed
- **Days Left Counter**: See how many days remain before trash items are deleted

## 🚀 Live Demo

[[Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/blig-blog)

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **Storage**: Browser localStorage
- **Language**: TypeScript
- **Routing**: Next.js App Router with useSearchParams

## 📦 Installation

### Prerequisites
- Node.js 18 or higher
- npm, pnpm, or yarn

### Setup
# 1. Clone the repository
git clone [https://github.com/your-username/blig-blog.git](https://github.com/wasem7112011/Blig-Blog.git)
cd blig-blog

# 2. Install dependencies
npm install

# 3. Run the development server
npm run dev

Open http://localhost:3000 in your browser.Build for Productionbashnpm run build
npm start

📁 Project Structurejavascriptblig-blog/
├── app/
│   ├── page.tsx              # Home page with post grid
│   ├── new-post/
│   │   └── page.tsx          # Create new post page
│   ├── post/[id]/
│   │   └── page.tsx          # Single post view
│   ├── layout.tsx            # Root layout
│   ├── globals.css           # Global styles + CSS variables
│   └── components/
│       ├── header.tsx        # Search bar + theme toggle
│       ├── sidebar.tsx       # Collections navigation
│       ├── post.tsx          # Post card component
│       ├── modeBox.tsx       # Dark/Light mode toggle
│       ├── sidebarbutton.tsx # Add post button
│       └── sidebarmainbutton.tsx # Sidebar navigation button
├── public/                   # Static assets
├── package.json
└── README.md🎯 How It Works
Create Posts: Click "New Post" to add content to any collectionOrganize: Posts are automatically sorted into collectionsSearch: Use the search bar to filter posts in real-timeDelete: Move posts to trash - they auto-delete after 10 daysTheme: Switch between dark and light mode - syncs across all tabsPrivacy: All data stays in your browser's localStorage🚢 Deployment
Deploy to Vercel
The easiest way to deploy:Click the "Deploy" button above, orPush to GitHub and import to VercelVercel will auto-detect Next.js and deployNo environment variables needed.Deploy to Other Platforms
This is a standard Next.js app and works on:NetlifyRailwayRenderCloudflare PagesBuild command: npm run buildOutput directory: .next🔒 Data Privacy
All posts are stored in your browser's localStorage. This means:✅ Your data never leaves your device✅ No account required✅ Works completely offline⚠️ Clearing browser data will delete all posts⚠️ Each device/browser has separate data📝 Customization
Change Auto-Delete Days
Edit app/page.tsx:tsconst TRASH_DAYS = 10; // Change to your preferred numberAdd New Collections
Update the PostType in app/page.tsx and add buttons in components/sidebar.tsx.Modify Theme Colors
Edit CSS variables in app/globals.css:css.dark {
  --bg-primary: #0f0f0f;
  --text: #ffffff;
  /* etc */
}🤝 Contributing
Contributions are welcome! Feel free to:Fork the repositoryCreate a feature branch: git checkout -b feature-nameCommit your changes: git commit -m 'Add feature'Push to the branch: git push origin feature-nameOpen a Pull Request📄 License
MIT License - you can use this project for personal or commercial purposes.🙏 Acknowledgments
Built with Next.jsStyled with Tailwind CSSIcons from LucideIf you like this project, give it a ⭐ on GitHub!
