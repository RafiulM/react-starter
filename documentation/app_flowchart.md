flowchart TD
    Start[Landing Page]
    Start --> ChooseAuth{Has Account}
    ChooseAuth -- Yes --> Login[Login Form]
    ChooseAuth -- No --> Register[Registration Form]
    Login -- Submit --> AuthLogin[Call api auth login]
    Register -- Submit --> AuthRegister[Call api auth register]
    AuthLogin -- Success --> Dashboard[Main Dashboard]
    AuthRegister -- Success --> Dashboard
    Login -- Forgot Password --> ForgotPass[Forgot Password Form]
    ForgotPass -- Send Link --> EmailSent[Email Sent]
    EmailSent --> ResetPass[Reset Password Form]
    ResetPass -- Submit --> AuthReset[Call api auth reset password]
    AuthReset -- Success --> Login
    Dashboard -- Generate Content --> AI[Generate AI Content]
    AI -- Enter Prompt --> CallAI[Call api ai generate]
    CallAI --> Loading[Loading]
    Loading --> Result[Show AI Response]
    Result -- Copy --> Copy[Copy to Clipboard]
    Result -- New Prompt --> AI
    Dashboard -- Profile Settings --> Profile[Profile Settings]
    Profile -- Update Profile --> Update[Call api auth update profile]
    Update -- Success --> Dashboard
    Profile -- Change Password --> ChgPwd[Change Password Form]
    ChgPwd -- Submit --> AuthChg[Call api auth change password]
    AuthChg -- Success --> Login
    Dashboard -- Log Out --> Logout[Clear Token]
    Logout --> Login
    %% Error handling
    CallAI -- Error --> Error[Show Error]
    AuthLogin -- Error --> Error
    AuthRegister -- Error --> Error
    AuthReset -- Error --> Error
    Update -- Error --> Error
    AuthChg -- Error --> Error
    Error -- Session Expired --> Login