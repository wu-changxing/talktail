# TalkTail - A Next.js Commenting System

TalkTail is a modern, feature-rich commenting system designed for integration with blog platforms. It uses Wagtail's Django REST framework (DRF) to fetch blog content via slugs and leverages Next.js 14 to display and manage comments stored in Firebase. This decouples the commenting system from the CMS, allowing for more advanced features and a fancier UI, without the need to alter a stable content management system or to deal with traditional Django templates.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js and npm (or Yarn/pnpm/bun)
- A Firebase account and project set up for storing comments
- Wagtail CMS running with a DRF API for your blog content

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/changxing-wu/talktail.git
   cd talktail
npm install
# or if you use Yarn
yarn install
# or for pnpm
pnpm install
# or for bun
bun install
    ```
2. Create a `.env.local` file in the root directory and add the following environment variables:
3. Run the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
   Features

### TalkTail aims to enhance the interactivity of blog posts by allowing users to:

- Share content to various platforms and services
- Generate QR codes for easy access on mobile devices
- Engage with social media integration
- And much more...

## Roadmap
- [x] Add support for Firebase
- [ ] complete the UI
- [x] Link to Wagtail CMS
- [] add comments
- [] add likes
- [] add replies
- [] add user authentication
- [] add user profiles
- [] add user settings
- [] add user notifications
- [] add user moderation
- [] add user blocking
- [] add user reporting
- [] add user analytics
- [] add user privacy
- [] add user data export
- [] add user data deletion
- [] add user data portability
- [ ] share content
- [ ] generate QR codes
- [ ] engage with social media
  Contributing

### We welcome contributions from the community. If you wish to contribute to the project, please:

Fork the project
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a pull request
## License

Distributed under the MIT License. See LICENSE for more information.

## Contact

## Acknowledgments

Wagtail CMS
Next.js
Firebase