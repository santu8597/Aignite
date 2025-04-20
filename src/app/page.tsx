import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      
       <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-card-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Image
              src="/logo.svg"
              alt="FraudGuard AI Logo"
              width={150}
              height={40}
              priority
            />
          </div>
          <nav className="hidden md:flex gap-8">
            <a href="#features" className="text-foreground/80 hover:text-primary transition-colors">Features</a>
            <a href="#how-it-works" className="text-foreground/80 hover:text-primary transition-colors">How It Works</a>
            <a href="#protection" className="text-foreground/80 hover:text-primary transition-colors">Protection</a>
            <a href="/Fraud" className="text-foreground/80 hover:text-primary transition-colors">Logs</a>
          </nav>
          <div className="flex items-center gap-4">
           
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 cyber-title">
                AI-Powered Fraud Detection
              </h1>
              <p className="text-xl text-foreground/80 mb-8">
                Protect yourself from scams, phishing attempts, and fraudulent websites with our cutting-edge AI technology.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/chat" className="cyber-button text-lg py-3 px-6">
                  Scan Now
                </Link>
                <Link href="#features" className="cyber-button bg-gradient-to-r from-secondary-dark to-secondary text-lg py-3 px-6">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="cyber-grid rounded-lg p-4 relative overflow-hidden">
                <div className="scan-line"></div>
                <div className="grid grid-cols-3 gap-4">
                  <Link href={'/audio-detect'} className="cyber-card flex flex-col items-center justify-center p-4">
                    <Image
                      src="/ai-agent.svg"
                      alt="AI Agent"
                      width={80}
                      height={80}
                      className="mb-2"
                    />
                    <p className="text-center text-sm">Audio Agent</p>
                  </Link>
                  <Link href={'/mail'} className="cyber-card flex flex-col items-center justify-center p-4">
                    <Image
                      src="/email-scan.svg"
                      alt="Email Scanning"
                      width={80}
                      height={80}
                      className="mb-2"
                    />
                    <p className="text-center text-sm">Email Scan</p>
                  </Link>
                  <Link href={'/phishing'} className="cyber-card flex flex-col items-center justify-center p-4">
                    <Image
                      src="/url-scan.svg"
                      alt="URL Scanning"
                      width={80}
                      height={80}
                      className="mb-2"
                    />
                    <p className="text-center text-sm">URL Scan</p>
                  </Link>
                  <div className="cyber-card flex flex-col items-center justify-center p-4">
                    <Image
                      src="/website-scan.svg"
                      alt="Website Scanning"
                      width={80}
                      height={80}
                      className="mb-2"
                    />
                    <p className="text-center text-sm">Website Safe Scan</p>
                  </div>
                  <Link href={'/Fraud'} className="cyber-card flex flex-col items-center justify-center p-4">
                    <Image
                      src="/dashboard.svg"
                      alt="Dashboard"
                      width={80}
                      height={80}
                      className="mb-2"
                    />
                    <p className="text-center text-sm">Scam logs</p>
                  </Link>
                  <div className="cyber-card flex flex-col items-center justify-center p-4">
                    <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-2">
                      <span className="text-primary text-2xl">+</span>
                    </div>
                    <p className="text-center text-sm">More Features</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-card-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 cyber-title">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="cyber-card flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-primary text-2xl">1</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Upload or Paste</h3>
              <p className="text-foreground/70">
                Simply upload a file, paste a URL, or share an email you want to check for fraud.
              </p>
            </div>
            <div className="cyber-card flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-primary text-2xl">2</span>
              </div>
              <h3 className="text-xl font-bold mb-2">AI Analysis</h3>
              <p className="text-foreground/70">
                Our advanced AI algorithms analyze the content for signs of fraud, phishing, or malicious intent.
              </p>
            </div>
            <div className="cyber-card flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <span className="text-primary text-2xl">3</span>
              </div>
              <h3 className="text-xl font-bold mb-2">Get Results</h3>
              <p className="text-foreground/70">
                Receive a detailed report with risk scores and recommendations to protect yourself.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* AI Features Section */}
      <section id="features" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 cyber-title">AI Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="cyber-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Image
                    src="/email-scan.svg"
                    alt="Email Scanning"
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="text-xl font-bold">Email Analysis</h3>
              </div>
              <p className="text-foreground/70">
                Detect phishing attempts, suspicious links, and fraudulent content in emails with our advanced AI.
              </p>
            </div>
            <div className="cyber-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Image
                    src="/url-scan.svg"
                    alt="URL Scanning"
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="text-xl font-bold">URL Verification</h3>
              </div>
              <p className="text-foreground/70">
                Check URLs for malicious content, fake websites, and potential security risks before clicking.
              </p>
            </div>
            <div className="cyber-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Image
                    src="/website-scan.svg"
                    alt="Website Scanning"
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="text-xl font-bold">Website Scanning</h3>
              </div>
              <p className="text-foreground/70">
                Analyze entire websites for fraudulent content, security vulnerabilities, and suspicious behavior.
              </p>
            </div>
            <div className="cyber-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Image
                    src="/dashboard.svg"
                    alt="Dashboard"
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="text-xl font-bold">Real-time Monitoring</h3>
              </div>
              <p className="text-foreground/70">
                Get instant alerts and notifications when suspicious activity is detected in your accounts.
              </p>
            </div>
            <div className="cyber-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Image
                    src="/ai-agent.svg"
                    alt="AI Agent"
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="text-xl font-bold">AI-Powered Insights</h3>
              </div>
              <p className="text-foreground/70">
                Receive detailed analysis and recommendations based on our advanced AI algorithms.
              </p>
            </div>
            <div className="cyber-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-xl">🔒</span>
                </div>
                <h3 className="text-xl font-bold">Secure & Private</h3>
              </div>
              <p className="text-foreground/70">
                Your data is encrypted and processed securely, with complete privacy protection.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Protection Section */}
      <section id="protection" className="py-20 bg-card-bg">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 cyber-title">Real-time Protection</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="cyber-card p-6 relative overflow-hidden">
              <div className="scan-line"></div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">Email Scan</h3>
                    <p className="text-foreground/70 text-sm">Checking for phishing attempts</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Image
                      src="/email-scan.svg"
                      alt="Email Scanning"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                <div className="h-2 bg-card-border rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-3/4"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">URL Verification</h3>
                    <p className="text-foreground/70 text-sm">Analyzing for malicious content</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Image
                      src="/url-scan.svg"
                      alt="URL Scanning"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                <div className="h-2 bg-card-border rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-1/2"></div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-bold">Website Analysis</h3>
                    <p className="text-foreground/70 text-sm">Scanning for security vulnerabilities</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <Image
                      src="/website-scan.svg"
                      alt="Website Scanning"
                      width={24}
                      height={24}
                    />
                  </div>
                </div>
                <div className="h-2 bg-card-border rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-5/6"></div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-6">Stay Protected 24/7</h3>
              <p className="text-foreground/80 mb-6">
                Our AI-powered system continuously monitors and analyzes potential threats in real-time, providing you with instant alerts and protection against fraud.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Instant Alerts</h4>
                    <p className="text-foreground/70">Get notified immediately when suspicious activity is detected</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Continuous Monitoring</h4>
                    <p className="text-foreground/70">Our AI agents work around the clock to protect your data</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center mt-1">
                    <span className="text-primary text-sm">✓</span>
                  </div>
                  <div>
                    <h4 className="font-bold">Detailed Reports</h4>
                    <p className="text-foreground/70">Receive comprehensive analysis of potential threats</p>
                  </div>
                </li>
              </ul>
              <button className="cyber-button mt-8">Start Protection Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 cyber-title">Trusted by Security Experts</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="cyber-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-xl">A</span>
                </div>
                <div>
                  <h3 className="font-bold">Alex Johnson</h3>
                  <p className="text-foreground/70 text-sm">Cybersecurity Consultant</p>
                </div>
              </div>
              <p className="text-foreground/70">
                "FraudGuard AI has revolutionized how we detect and prevent fraud. The AI-powered analysis is incredibly accurate and has saved our clients millions."
              </p>
            </div>
            <div className="cyber-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-xl">S</span>
                </div>
                <div>
                  <h3 className="font-bold">Sarah Chen</h3>
                  <p className="text-foreground/70 text-sm">IT Security Director</p>
                </div>
              </div>
              <p className="text-foreground/70">
                "The real-time protection and instant alerts have been game-changers for our security team. We can now respond to threats before they cause damage."
              </p>
            </div>
            <div className="cyber-card">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-xl">M</span>
                </div>
                <div>
                  <h3 className="font-bold">Michael Rodriguez</h3>
                  <p className="text-foreground/70 text-sm">Financial Services CTO</p>
                </div>
              </div>
              <p className="text-foreground/70">
                "Implementing FraudGuard AI has significantly reduced fraud incidents in our organization. The AI features are cutting-edge and the protection is comprehensive."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card-bg">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 cyber-title">Ready to Protect Yourself?</h2>
          <p className="text-xl text-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of users who trust FraudGuard AI to protect them from fraud and cyber threats.
          </p>
          <Link href="/chat" className="cyber-button text-lg py-3 px-8">Get Started Now</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-card-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Image
                src="/logo.svg"
                alt="FraudGuard AI Logo"
                width={150}
                height={40}
                className="mb-4"
              />
              <p className="text-foreground/70">
                Advanced AI-powered fraud detection system protecting users worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2">
                <li><a href="#features" className="text-foreground/70 hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Integrations</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Updates</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">About</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Blog</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Careers</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Help Center</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">API</a></li>
                <li><a href="#" className="text-foreground/70 hover:text-primary transition-colors">Status</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-card-border flex flex-col md:flex-row justify-between items-center">
            <p className="text-foreground/70 text-sm">
              © 2023 FraudGuard AI. All rights reserved.
            </p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Terms of Service</a>
              <a href="#" className="text-foreground/70 hover:text-primary transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
