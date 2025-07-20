import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Code, Zap, Rocket, Palette, Shield, Database } from "lucide-react";
import { Link } from "react-router";

const MainPage = () => {
  const techStack = [
    "React 19",
    "TypeScript",
    "Vite",
    "TailwindCSS 4",
    "Shadcn/ui",
    "Framer Motion",
    "React Router v7",
    "Firebase",
    "Lucide Icons",
  ];

  const features = [
    {
      icon: <Code className="w-6 h-6" />,
      title: "Modern React 19",
      description: "Built with the latest React 19 features and best practices for optimal performance.",
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Lightning Fast",
      description: "Powered by Vite for instant hot module replacement and blazing fast builds.",
    },
    {
      icon: <Palette className="w-6 h-6" />,
      title: "Beautiful UI",
      description: "Shadcn/ui components with TailwindCSS 4 for stunning, responsive designs.",
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Type Safe",
      description: "Full TypeScript support with strict type checking for bulletproof code.",
    },
    {
      icon: <Rocket className="w-6 h-6" />,
      title: "Production Ready",
      description: "Optimized configuration and build process for seamless deployment.",
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Firebase Integration",
      description: "Complete Firebase setup with authentication, Firestore, and storage ready to use.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="text-center mb-12 sm:mb-16">
        <motion.div variants={itemVariants}>
          <Badge variant="secondary" className="mb-6 text-gray-300">
            <Rocket className="w-4 h-4 mr-2" />
            Boilerplate Starter Pack
          </Badge>
        </motion.div>

        <motion.h1
          variants={itemVariants}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent px-4"
        >
          Modern React
          <br />
          <span className="text-primary">Starter Kit</span>
        </motion.h1>

        <motion.p variants={itemVariants} className="text-lg sm:text-xl text-gray-300 mb-8 max-w-2xl mx-auto px-4">
          A carefully crafted boilerplate with the latest React 19, TypeScript, and modern tooling. Everything you need to build
          amazing applications, fast.
        </motion.p>

        <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center mb-12 px-4">
          <Button
            asChild
            size="lg"
            className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto text-gray-300 bg-gray-800/50"
          >
            <Link to="/login">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Try Auth Demo
            </Link>
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="text-base sm:text-lg px-6 sm:px-8 py-4 sm:py-6 w-full sm:w-auto border-gray-600 text-gray-200 hover:bg-gray-800"
          >
            <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            View on GitHub
          </Button>
        </motion.div>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="mb-12 sm:mb-16">
        <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-bold text-center mb-8 text-white px-4">
          Tech Stack
        </motion.h2>
        <motion.div variants={itemVariants} className="flex flex-wrap gap-2 sm:gap-3 justify-center px-4">
          {techStack.map((tech, index) => (
            <motion.div
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Badge
                variant="outline"
                className="text-xs sm:text-sm px-3 sm:px-4 py-1 sm:py-2 border-gray-600 text-gray-200 bg-gray-800/50"
              >
                {tech}
              </Badge>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="mb-12 sm:mb-16">
        <motion.h2 variants={itemVariants} className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12 text-white px-4">
          Features
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 px-4">
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants} whileHover={{ y: -5 }} className="h-full">
              <Card className="h-full hover:shadow-lg transition-shadow bg-gray-800/50 border-gray-700">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500/20 rounded-lg text-blue-400">{feature.icon}</div>
                    <CardTitle className="text-lg sm:text-xl text-white">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm sm:text-base text-gray-300">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div initial="hidden" animate="visible" variants={containerVariants} className="text-center">
        <motion.div variants={itemVariants}>
          <Card className="max-w-2xl mx-auto bg-gradient-to-r from-green-500/10 to-blue-500/10 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-xl sm:text-2xl text-white">Ready to Build?</CardTitle>
              <CardDescription className="text-sm sm:text-base text-gray-300">
                Get started with this modern React boilerplate and build your next amazing project.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 justify-center text-gray-300">
                <Button asChild size="lg" className="w-full sm:w-auto text-gray-300 bg-gray-800/50">
                  <Link to="/login">
                    <Shield className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Try Auth Demo
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-gray-600 text-gray-200 hover:bg-gray-800">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  View on GitHub
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MainPage;
