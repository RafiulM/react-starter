flowchart TD
    Start[Start] --> CloneRepo[Clone Repository]
    CloneRepo --> InstallDeps[Install Dependencies]
    InstallDeps --> SetupEnv[Setup Environment Variables]
    SetupEnv --> RunDev[Run Development Servers]
    RunDev --> OpenVSCode[Open in VS Code]
    OpenVSCode --> DevDashboard[View Project Structure]
    DevDashboard --> EditFrontend[Edit Frontend Components]
    DevDashboard --> AddAPI[Create New API Endpoint]
    EditFrontend --> HotReload[Hot Reload]
    HotReload --> DevDashboard
    AddAPI --> TestAPI[Test API Route]
    TestAPI --> DevDashboard
    DevDashboard --> ModifyAuth[Update Authentication Logic]
    ModifyAuth --> DevDashboard
    DevDashboard --> ConsultGuides[Consult .claude Guides]
    ConsultGuides --> DevDashboard
    DevDashboard --> ErrorCheck{Error Occurs?}
    ErrorCheck -->|Yes| HandleError[Handle Error State]
    HandleError --> DevDashboard
    ErrorCheck -->|No| Conclusion[Proceed to Conclusion]
    Conclusion --> End[End]