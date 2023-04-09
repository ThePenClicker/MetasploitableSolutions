# CVE-2011-2523 - vsftpd_2_3_4_exploit

This is a POC for enumerating users from a SMTP server using SMTP Commands

## Demo

PS D:\NodeJS\smtp-enum> node .\smtp-enum-vrfy.js
```
[*] Server: 192.168.31.129:25
[*] Mode: VRFY
[*] Verbose Output: false  
[*] File: usernames.txt    
[*] SMTP VRFY Check Started
--[+] User:bin exists
--[+] User:daemon exists
--[+] User:ftp exists  
--[+] User:games exists
--[+] User:lp exists  
--[+] User:mail exists
--[+] User:man exists  
--[+] User:mysql exists
--[+] User:news exists
--[+] User:nobody exists
--[+] User:postfix exists   
--[+] User:postgres exists  
--[+] User:postmaster exists
--[+] User:root exists
--[+] User:sshd exists
--[+] User:sync exists
--[+] User:user exists
--[+] User:uucp exists
[*] SMTP VRFY Check Complete
```

#Installation

git clone https://github.com/ThePenClicker/MetasploitableSolutions.git

cd MetasploitableSolutions/smtp-enum-vrfy.js

node index.js