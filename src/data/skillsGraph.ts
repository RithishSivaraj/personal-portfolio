export interface GraphNode {
    id: string;
    label: string;
    type: "core" | "project" | "tool";
}

export interface GraphLink {
    source: string;
    target: string;
}

export const nodes: GraphNode[] = [
    { id: "myskills", label: "My Skills", type: "core" },
    // Project nodes
    { id: "frauddetect", label: "FraudDetect", type: "project" },
    { id: "stockpicker", label: "Distributed Stock Picker", type: "project" },
    { id: "algollmbot", label: "Algo-LLM-Bot", type: "project" },
    { id: "nammaledger", label: "namma-ledger", type: "project" },
    { id: "redtrieve", label: "Redtrieve", type: "project" },
    { id: "unixadmin", label: "Multi-platform UNIX/Linux Infrastructure Administration", type: "project" },
    { id: "portfolio", label: "This Website", type: "project" },
    { id: "herocodemere", label: "Hero of Codemere", type: "project" },

    // Tool/skill nodes
    { id: "python", label: "Python", type: "tool" },
    { id: "flask", label: "Flask", type: "tool" },
    { id: "pandas", label: "Pandas", type: "tool" },
    { id: "numpy", label: "NumPy", type: "tool" },
    { id: "sklearn", label: "scikit-learn", type: "tool" },
    { id: "smote", label: "SMOTE", type: "tool" },
    { id: "kafka", label: "Kafka", type: "tool" },
    { id: "fastapi", label: "FastAPI", type: "tool" },
    { id: "nginx", label: "Nginx", type: "tool" },
    { id: "docker", label: "Docker", type: "tool" },
    { id: "typescript", label: "TypeScript", type: "tool" },
    { id: "ollama", label: "Ollama", type: "tool" },
    { id: "llama3", label: "Llama 3.1", type: "tool" },
    { id: "playwright", label: "Playwright", type: "tool" },
    { id: "beautifulsoup", label: "BeautifulSoup", type: "tool" },
    { id: "awsec2", label: "AWS EC2", type: "tool" },
    { id: "awsrds", label: "AWS RDS", type: "tool" },
    { id: "awss3", label: "AWS S3", type: "tool" },
    { id: "linux", label: "Linux", type: "tool" },
    { id: "bsd", label: "BSD", type: "tool" },
    { id: "unix", label: "UNIX", type: "tool" },
    { id: "filesystems", label: "Filesystem Management", type: "tool" },
    { id: "tcpip", label: "TCP/IP", type: "tool" },
    { id: "dns", label: "DNS", type: "tool" },
    { id: "nfs", label: "NFS", type: "tool" },
    { id: "dhcp", label: "DHCP", type: "tool" },
    { id: "webservers", label: "Web Servers", type: "tool" },
    { id: "authencryption", label: "Authentication & Encryption", type: "tool" },
    { id: "shellscripting", label: "Shell Scripting", type: "tool" },
    { id: "systemautomation", label: "System Automation", type: "tool" },
    { id: "virtualization", label: "Virtualization", type: "tool" },
    { id: "cloudorchestration", label: "Cloud Orchestration", type: "tool" },
    { id: "securityhardening", label: "Security Hardening", type: "tool" },
    { id: "loggingmonitoring", label: "Logging & Monitoring", type: "tool" },
    { id: "react", label: "React", type: "tool" },
    { id: "vite", label: "Vite", type: "tool" },
    { id: "css", label: "CSS", type: "tool" },
    { id: "html", label: "HTML", type: "tool" },
    { id: "pygame", label: "Pygame", type: "tool" },
    { id: "pytmx", label: "PyTMX", type: "tool" },
    { id: "tiled", label: "Tiled", type: "tool" },
    { id: "dsa", label: "Data Structures & Algorithms", type: "tool" },
];

export const links: GraphLink[] = [
    // FraudDetect
    { source: "frauddetect", target: "python" },
    { source: "frauddetect", target: "flask" },
    { source: "frauddetect", target: "pandas" },
    { source: "frauddetect", target: "numpy" },
    { source: "frauddetect", target: "sklearn" },
    { source: "frauddetect", target: "smote" },

    // Distributed Stock Picker
    { source: "stockpicker", target: "kafka" },
    { source: "stockpicker", target: "fastapi" },
    { source: "stockpicker", target: "nginx" },
    { source: "stockpicker", target: "docker" },
    { source: "stockpicker", target: "python" },

    // Algo-LLM-Bot
    { source: "algollmbot", target: "typescript" },
    { source: "algollmbot", target: "ollama" },
    { source: "algollmbot", target: "llama3" },

    // namma-ledger
    { source: "nammaledger", target: "typescript" },

    // Redtrieve
    { source: "redtrieve", target: "python" },
    { source: "redtrieve", target: "playwright" },
    { source: "redtrieve", target: "beautifulsoup" },
    { source: "redtrieve", target: "awsec2" },
    { source: "redtrieve", target: "awsrds" },
    { source: "redtrieve", target: "awss3" },

    // Multi-platform UNIX/Linux Infrastructure Administration
    { source: "unixadmin", target: "linux" },
    { source: "unixadmin", target: "bsd" },
    { source: "unixadmin", target: "unix" },
    { source: "unixadmin", target: "filesystems" },
    { source: "unixadmin", target: "tcpip" },
    { source: "unixadmin", target: "dns" },
    { source: "unixadmin", target: "nfs" },
    { source: "unixadmin", target: "dhcp" },
    { source: "unixadmin", target: "webservers" },
    { source: "unixadmin", target: "authencryption" },
    { source: "unixadmin", target: "shellscripting" },
    { source: "unixadmin", target: "systemautomation" },
    { source: "unixadmin", target: "virtualization" },
    { source: "unixadmin", target: "cloudorchestration" },
    { source: "unixadmin", target: "securityhardening" },
    { source: "unixadmin", target: "loggingmonitoring" },

    // This Website
    { source: "portfolio", target: "typescript" },
    { source: "portfolio", target: "react" },
    { source: "portfolio", target: "vite" },
    { source: "portfolio", target: "css" },
    { source: "portfolio", target: "html" },

    // Hero of Codemere
    { source: "herocodemere", target: "python" },
    { source: "herocodemere", target: "pygame" },
    { source: "herocodemere", target: "pytmx" },
    { source: "herocodemere", target: "tiled" },
    { source: "herocodemere", target: "dsa" },

    { source: "myskills", target: "frauddetect" },
    { source: "myskills", target: "stockpicker" },
    { source: "myskills", target: "algollmbot" },
    { source: "myskills", target: "nammaledger" },
    { source: "myskills", target: "redtrieve" },
    { source: "myskills", target: "unixadmin" },
    { source: "myskills", target: "portfolio" },
    { source: "myskills", target: "herocodemere" },

];