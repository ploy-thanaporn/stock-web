import Sidebar from "./components/Sidebar";
import "./globals.css";

// const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="flex flex-col">
          <div>
            <Sidebar component={children} />
          </div>
        </div>
      </body>
    </html>
  );
}
