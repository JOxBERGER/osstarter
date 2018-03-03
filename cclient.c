#if defined(__APPLE__) && defined(__MACH__)
const char *os = "osx";
#elif defined(__linux__)
const char *os = "linux";
#elif defined(_WIN32)
const char *os = "win32"
#elif defined(_WIN64)
const char *os = "win64"
#else
const char *os = "???";
#endif

#include <stdio.h>      /* for printf() and fprintf() */
#include <sys/socket.h> /* for socket(), connect(), sendto(), and recvfrom() */
#include <arpa/inet.h>  /* for sockaddr_in and inet_addr() */
#include <stdlib.h>     /* for atoi() and exit() */
#include <string.h>     /* for memset() */
#include <unistd.h>     /* for close() */

//#include <sys/reboot.h>
//#import <CoreServices/CoreServices.h>

#define MAXRECVSTRING 255 /* Longest string to receive */

/*note
#if defined(_WIN32) || defined(_WIN64)
        const char* os = "Windows";
#elif __linux__
        const char* os = "Linux";
#else
        const char* os = "Unknown";
#endif
*/

int main(int argc, char *argv[])
{
    int sock;                            /* Socket */
    struct sockaddr_in broadcastAddr;    /* Broadcast Address */
    unsigned short broadcastPort = 5700; /* Port */
    char recvString[MAXRECVSTRING + 1];  /* Buffer for received string */
    int recvStringLen;                   /* Length of received string */
    unsigned long counter = 0;

    //printf("port defaults to 5700 To use another port start with ./client <PORT>.");
    printf(" Startupudp on ");
    printf(os);
    printf(" started.\n\n");
    fflush(stdout);

    printf("Port defaults to 5700 To use another port start with ./client <PORT>.\n");

    if (argc == 2)
    {
        broadcastPort = atoi(argv[1]);
        printf("Port defined per commandline argument to %d\n", broadcastPort);
    }
    printf("Now Using Port: %d\n", broadcastPort);
    fflush(stdout);

    //broadcastPort = 5007; //atoi(argv[1]);   /* First arg: broadcast port */

    /* Create a best-effort datagram socket using UDP */
    if ((sock = socket(PF_INET, SOCK_DGRAM, IPPROTO_UDP)) < 0)
        printf("socket() failed");

    /* Construct bind structure */
    memset(&broadcastAddr, 0, sizeof(broadcastAddr));  /* Zero out structure */
    broadcastAddr.sin_family = AF_INET;                /* Internet address family */
    broadcastAddr.sin_addr.s_addr = htonl(INADDR_ANY); /* Any incoming interface */
    broadcastAddr.sin_port = htons(broadcastPort);     /* Broadcast port */

    /* Bind to the broadcast port */
    if (bind(sock, (struct sockaddr *)&broadcastAddr, sizeof(broadcastAddr)) < 0)
        printf("bind() failed");

    fflush(stdout);
    //recvString[recvStringLen] = '\0';
    //printf("Received: %s\n", recvString);    /* Print the received string */

    //close(sock);
    //exit(0);
    //system("touch test.txt < 123");
    //system("..");
    while (1)
    {
        printf("\n");
        /* Receive a single datagram from the server */
        recvStringLen = recvfrom(sock, recvString, MAXRECVSTRING, 0, NULL, 0);
        counter++;

        recvString[recvStringLen] = '\0';
        printf("Received: %s\n", recvString); /* Print the received string */
        printf("os = %s // ", os);
        printf("packet = %lu \n", counter);
        fflush(stdout);

        if (strcmp(recvString, "!!reboot!!") == 0)
        {
            printf("will reboot\n\n");
            fflush(stdout);
            system("sudo shutdown -r now");
        }
        else if (strcmp(recvString, "!!shutdown!!") == 0)
        {
            printf("will shutdown\n\n\n\n");
            fflush(stdout);
            system("sudo shutdown now");
        }
        sleep(1000);
    }
}