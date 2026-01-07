
// CPUSchedulingAppDlg.cpp : implementation file
//

#include "pch.h"
#include "framework.h"
#include "CPUSchedulingApp.h"
#include "CPUSchedulingAppDlg.h"
#include "afxdialogex.h"
#include "vector"
#include<algorithm>
#include "afxdialogex.h"
#include<queue>
#include<string>
 // This header includes the definition of CButton



#ifdef _DEBUG
#define new DEBUG_NEW
#endif
  // Ensure 1003 is unique



struct Process {
	int processID;
	int arrivalTime;
	int burstTime;
	int priority;
	int AvgWaitingTime;
	int turnaroundTime;
	int completionTime;
	int originalIndex;
	int remainingBurstTime;
	int waitingTime;
};


// CAboutDlg dialog used for App About

class CAboutDlg : public CDialogEx
{
public:
	CAboutDlg();

// Dialog Data
#ifdef AFX_DESIGN_TIME
	enum { IDD = IDD_ABOUTBOX };
#endif

	protected:
	virtual void DoDataExchange(CDataExchange* pDX);    // DDX/DDV support

// Implementation
protected:
	DECLARE_MESSAGE_MAP()
public:
	/*afx_msg void OnBnClickedButtonRound();*/
};

CAboutDlg::CAboutDlg() : CDialogEx(IDD_ABOUTBOX)
{
}

void CAboutDlg::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
}

//BEGIN_MESSAGE_MAP(CAboutDlg, CDialogEx)
//	ON_BN_CLICKED(IDC_BUTTON_Round, &CAboutDlg::OnBnClickedButtonRound)
//END_MESSAGE_MAP()


// CCPUSchedulingAppDlg dialog



CCPUSchedulingAppDlg::CCPUSchedulingAppDlg(CWnd* pParent /*=nullptr*/)
	: CDialogEx(IDD_CPUSCHEDULINGAPP_DIALOG, pParent)
	, m_ArrivalTime(0)
	, m_BurstTime(0)
	, m_Priority(0)
	
{
	m_hIcon = AfxGetApp()->LoadIcon(IDR_MAINFRAME);
}

void CCPUSchedulingAppDlg::DoDataExchange(CDataExchange* pDX)
{
	CDialogEx::DoDataExchange(pDX);
	DDX_Text(pDX, IDC_EDIT5, m_ArrivalTime);
	DDX_Text(pDX, IDC_EDIT6, m_BurstTime);
	DDX_Text(pDX, IDC_EDIT7, m_Priority);
	
	
}

BEGIN_MESSAGE_MAP(CCPUSchedulingAppDlg, CDialogEx)
	ON_WM_SYSCOMMAND()
	ON_WM_PAINT()
	ON_WM_QUERYDRAGICON()
	ON_BN_CLICKED(IDCANCEL, &CCPUSchedulingAppDlg::OnBnClickedCancel)

	ON_NOTIFY(LVN_ITEMCHANGED, IDC_LIST1, &CCPUSchedulingAppDlg::OnLvnItemchangedList1)
	ON_BN_CLICKED(IDC_BUTTON_ADD_PROCESS, &CCPUSchedulingAppDlg::OnBnClickedButtonAddProcess)
	ON_BN_CLICKED(IDC_BUTTON_FCFS, &CCPUSchedulingAppDlg::OnBnClickedButtonFcfs)
	ON_BN_CLICKED(IDC_BUTTON4_priority2, &CCPUSchedulingAppDlg::OnBnClickedButton4priority)
    ON_BN_CLICKED(IDC_BUTTON7_SJN, &CCPUSchedulingAppDlg::OnBnClickedButton7Sjn)
	ON_BN_CLICKED(IDC_BUTTON11_Clear, &CCPUSchedulingAppDlg::OnBnClickedButton11Clear)
	ON_BN_CLICKED(IDC_BUTTON2_SJF_preemptive, &CCPUSchedulingAppDlg::OnBnClickedButton2Sjfpreemptive)
	
	
	
	
END_MESSAGE_MAP()




// CCPUSchedulingAppDlg message handlers

BOOL CCPUSchedulingAppDlg::OnInitDialog()
{
	CDialogEx::OnInitDialog();

	// Add "About..." menu item to system menu.
	

	// IDM_ABOUTBOX must be in the system command range.
	ASSERT((IDM_ABOUTBOX & 0xFFF0) == IDM_ABOUTBOX);
	ASSERT(IDM_ABOUTBOX < 0xF000);

	CMenu* pSysMenu = GetSystemMenu(FALSE);
	if (pSysMenu != nullptr)
	{
		BOOL bNameValid;
		CString strAboutMenu;
		bNameValid = strAboutMenu.LoadString(IDS_ABOUTBOX);
		ASSERT(bNameValid);
		if (!strAboutMenu.IsEmpty())
		{
			pSysMenu->AppendMenu(MF_SEPARATOR);
			pSysMenu->AppendMenu(MF_STRING, IDM_ABOUTBOX, strAboutMenu);
		}
	}

	// Set the icon for this dialog.  The framework does this automatically
	//  when the application's main window is not a dialog
	SetIcon(m_hIcon, TRUE);			// Set big icon
	SetIcon(m_hIcon, FALSE);		// Set small icon

	// TODO: Add extra initialization here

	CListCtrl* pListCtrl = (CListCtrl*)GetDlgItem(IDC_LIST1);

	// Adding columns
	pListCtrl->InsertColumn(0, _T("Process ID"), LVCFMT_LEFT, 200); // 100 is the width
	pListCtrl->InsertColumn(1, _T("Arrival Time"), LVCFMT_LEFT, 200);
	pListCtrl->InsertColumn(2, _T("Burst Time"), LVCFMT_LEFT, 200);
	pListCtrl->InsertColumn(3, _T("Priority"), LVCFMT_LEFT, 200);
	pListCtrl->InsertColumn(4, _T("Completion Time"), LVCFMT_LEFT, 200);


	return TRUE;  // return TRUE  unless you set the focus to a control
}

void CCPUSchedulingAppDlg::OnSysCommand(UINT nID, LPARAM lParam)
{
	if ((nID & 0xFFF0) == IDM_ABOUTBOX)
	{
		CAboutDlg dlgAbout;
		dlgAbout.DoModal();
	}
	else
	{
		CDialogEx::OnSysCommand(nID, lParam);
	}
}

// If you add a minimize button to your dialog, you will need the code below
//  to draw the icon.  For MFC applications using the document/view model,
//  this is automatically done for you by the framework.

void CCPUSchedulingAppDlg::OnPaint()
{
	if (IsIconic())
	{
		CPaintDC dc(this); // device context for painting

		SendMessage(WM_ICONERASEBKGND, reinterpret_cast<WPARAM>(dc.GetSafeHdc()), 0);

		// Center icon in client rectangle
		int cxIcon = GetSystemMetrics(SM_CXICON);
		int cyIcon = GetSystemMetrics(SM_CYICON);
		CRect rect;
		GetClientRect(&rect);
		int x = (rect.Width() - cxIcon + 1) / 2;
		int y = (rect.Height() - cyIcon + 1) / 2;

		// Draw the icon
		dc.DrawIcon(x, y, m_hIcon);
	}
	else
	{
		CDialogEx::OnPaint();
	}
}

// The system calls this function to obtain the cursor to display while the user drags
//  the minimized window.
HCURSOR CCPUSchedulingAppDlg::OnQueryDragIcon()
{
	return static_cast<HCURSOR>(m_hIcon);
}

BEGIN_MESSAGE_MAP(CAboutDlg, CDialogEx)
	// Add message handler mappings here
END_MESSAGE_MAP()


void CCPUSchedulingAppDlg::OnBnClickedCancel()
{
	// TODO: Add your control notification handler code here
	CDialogEx::OnCancel();
}





void CCPUSchedulingAppDlg::OnLvnItemchangedList1(NMHDR* pNMHDR, LRESULT* pResult)
{
	LPNMLISTVIEW pNMLV = reinterpret_cast<LPNMLISTVIEW>(pNMHDR);
	// TODO: Add your control notification handler code here
	*pResult = 0;
}



void CCPUSchedulingAppDlg::OnBnClickedButtonAddProcess()
{
	
		// TODO: Add your control notification handler code here

		// Get data from the input fields
		int arrivalTime = GetDlgItemInt(IDC_EDIT5);  // Replace IDC_EDIT5 with the actual ID of the Arrival Time edit control
		int burstTime = GetDlgItemInt(IDC_EDIT6);    // Replace IDC_EDIT6 with the actual ID of the Burst Time edit control
		int priority = GetDlgItemInt(IDC_EDIT7);     // Replace IDC_EDIT7 with the actual ID of the Priority edit control

		// Add logic to validate the inputs (optional but recommended)
		if (arrivalTime < 0 || burstTime <= 0) // Example validation
		{
			AfxMessageBox(_T("Invalid input! Please enter positive numbers."));
			return;
		}

		// Add your logic here (e.g., adding the process to a list)
		static int processID = 1; // This should ideally be managed better
		CString strProcessID;
		strProcessID.Format(_T("P%d"), processID++);

		// Assuming you have a CListCtrl with ID IDC_LIST1
		CListCtrl* pListCtrl = (CListCtrl*)GetDlgItem(IDC_LIST1);

		// Insert the new process data into the List Control
		int nIndex = pListCtrl->InsertItem(0, strProcessID); // Insert process ID
		CString strArrivalTime;
		CString strBurstTime;
		CString strPriority;
		strArrivalTime.Format(_T("%d"), arrivalTime);
		strBurstTime.Format(_T("%d"), burstTime);
		strPriority.Format(_T("%d"), priority);

		pListCtrl->SetItemText(nIndex, 1, strArrivalTime);   // Insert Arrival Time
		pListCtrl->SetItemText(nIndex, 2, strBurstTime);     // Insert Burst Time
		pListCtrl->SetItemText(nIndex, 3, strPriority);      // Insert Priority

		// Message box for confirmation (can be removed later)
		AfxMessageBox(_T("Process added successfully!"));
	

}


void CCPUSchedulingAppDlg::OnBnClickedButtonFcfs()
{
	CListCtrl* pListCtrl = (CListCtrl*)GetDlgItem(IDC_LIST1);
	int nItems = pListCtrl->GetItemCount();

	if (nItems == 0) {
		AfxMessageBox(_T("No processes available for scheduling!"));
		return;
	}

	std::vector<Process> processes;
	CString strTemp;

	// Step 1: Extract the original process data from the list control (including processID)
	for (int i = 0; i < nItems; i++) {
		Process proc;

		// Get the Process ID (column 0)
		strTemp = pListCtrl->GetItemText(i, 0);
		proc.processID = _ttoi(strTemp.Mid(1));  // Remove the 'P' prefix and convert to integer

		// Get Arrival Time (column 1)
		strTemp = pListCtrl->GetItemText(i, 1);
		proc.arrivalTime = _ttoi(strTemp);

		// Get Burst Time (column 2)
		strTemp = pListCtrl->GetItemText(i, 2);
		proc.burstTime = _ttoi(strTemp);

		processes.push_back(proc);
	}

	// Step 2: Sort processes by arrival time
	std::sort(processes.begin(), processes.end(), [](const Process& a, const Process& b) {
		return a.arrivalTime < b.arrivalTime;
		});

	// Step 3: FCFS execution order
	int currentTime = 0;
	int totalWaitingTime = 0;
	int totalTurnaroundTime = 0;
	CString result = _T("FCFS Scheduling Order:\n\n");

	for (auto& proc : processes) {

		// Set current time if idle
		if (currentTime < proc.arrivalTime) {
			currentTime = proc.arrivalTime;
		}

		// Calculate waiting time, turnaround time, and completion time
		proc.AvgWaitingTime = currentTime - proc.arrivalTime;
		proc.turnaroundTime = proc.AvgWaitingTime + proc.burstTime;
		proc.completionTime = currentTime + proc.burstTime;

		totalWaitingTime += proc.AvgWaitingTime;
		totalTurnaroundTime += proc.turnaroundTime;

		// Format the execution log
		CString strExec;
		strExec.Format(_T("Process P%d starts at time %d and runs for %d units, completing at time %d.\n"),
			proc.processID, currentTime, proc.burstTime, proc.completionTime);
		result += strExec;

		// Update current time for the next process
		currentTime += proc.burstTime;
	}

	// Step 4: Calculate averages and CPU utilization
	int totalBurstTime = 0;
	for (const auto& proc : processes) {
		totalBurstTime += proc.burstTime;
	}

	float averageWaitingTime = static_cast<float>(totalWaitingTime) / nItems;
	float averageTurnaroundTime = static_cast<float>(totalTurnaroundTime) / nItems;
	float cpuUtilization = static_cast<float>(totalBurstTime) / currentTime * 100;

	// Display the result in a message box
	CString summary;
	summary.Format(_T("\nAverage Waiting Time: %.2f\nTurnaround Time: %.2f\nCPU Utilization: %.2f%%\n"),
		averageWaitingTime, averageTurnaroundTime, cpuUtilization);
	AfxMessageBox(result + summary);

	// Step 5: Set each value in its designated control (for UI display)
	CString strAvgWaitingTime, strAvgTurnaroundTime, strCpuUtilization;
	strAvgWaitingTime.Format(_T("%.2f"), averageWaitingTime);
	strAvgTurnaroundTime.Format(_T("%.2f"), averageTurnaroundTime);
	strCpuUtilization.Format(_T("%.2f%%"), cpuUtilization);

	SetDlgItemText(IDC_EDIT2_Waiting, strAvgWaitingTime);       // Average waiting time
	SetDlgItemText(IDC_EDIT3_Turnaround, strAvgTurnaroundTime); // Average turnaround time
	SetDlgItemText(IDC_EDIT4_Completion, strCpuUtilization);    // CPU utilization

	// Step 6: Update the List Control's completion times based on the original order
	for (int i = 0; i < nItems; i++) {
		// Get the Process ID from the List Control (column 0)
		strTemp = pListCtrl->GetItemText(i, 0);
		int listProcessID = _ttoi(strTemp.Mid(1));  // Remove 'P' prefix

		// Find the corresponding process in the sorted list
		for (const auto& proc : processes) {
			if (proc.processID == listProcessID) {
				// Update the List Control with the correct completion time (column 4)
				CString strCompletionTime;
				strCompletionTime.Format(_T("%d"), proc.completionTime);
				pListCtrl->SetItemText(i, 4, strCompletionTime);  // Column index 4 for Completion Time
				break;
			}
		}
	}
}


void CCPUSchedulingAppDlg::OnBnClickedButton4priority()
{
	CListCtrl* pListCtrl = (CListCtrl*)GetDlgItem(IDC_LIST1);
	int nItems = pListCtrl->GetItemCount();

	if (nItems == 0) {
		AfxMessageBox(_T("No processes available for scheduling!"));
		return;
	}

	std::vector<Process> processes;
	CString strTemp;

	// Step 1: Extract the original process data from the list control
	for (int i = 0; i < nItems; i++) {
		Process proc;
		strTemp = pListCtrl->GetItemText(i, 0); // Get Process ID from the list control
		proc.processID = _ttoi(strTemp.Mid(1));  // Extract ID number after 'P'

		strTemp = pListCtrl->GetItemText(i, 1);
		proc.arrivalTime = _ttoi(strTemp);

		strTemp = pListCtrl->GetItemText(i, 2);
		proc.burstTime = _ttoi(strTemp);

		strTemp = pListCtrl->GetItemText(i, 3);
		proc.priority = _ttoi(strTemp);

		processes.push_back(proc);
	}

	// Step 2: Sort processes by priority (lower number means higher priority)
	std::sort(processes.begin(), processes.end(), [](const Process& a, const Process& b) {
		if (a.priority == b.priority) {
			return a.arrivalTime < b.arrivalTime;  // If priorities are equal, sort by arrival time
		}
		return a.priority < b.priority;
		});

	// Step 3: Priority scheduling execution order
	int currentTime = 0;
	int totalWaitingTime = 0;
	int totalTurnaroundTime = 0;
	CString result = _T("Priority Scheduling Order:\n\n");

	for (auto& proc : processes) {
		if (currentTime < proc.arrivalTime) {
			currentTime = proc.arrivalTime;
		}

		proc.AvgWaitingTime = currentTime - proc.arrivalTime;
		proc.completionTime = currentTime + proc.burstTime;
		proc.turnaroundTime = proc.completionTime - proc.arrivalTime;

		totalWaitingTime += proc.AvgWaitingTime;
		totalTurnaroundTime += proc.turnaroundTime;

		// Log the execution details
		CString strExec;
		strExec.Format(_T("Process P%d starts at time %d and runs for %d units, completing at time %d.\n"),
			proc.processID, currentTime, proc.burstTime, proc.completionTime);
		result += strExec;

		// Update current time for the next process
		currentTime += proc.burstTime;
	}

	// Step 4: Calculate averages and CPU utilization
	int totalBurstTime = 0;
	for (const auto& proc : processes) {
		totalBurstTime += proc.burstTime;
	}

	float averageWaitingTime = static_cast<float>(totalWaitingTime) / nItems;
	float averageTurnaroundTime = static_cast<float>(totalTurnaroundTime) / nItems;
	float cpuUtilization = static_cast<float>(totalBurstTime) / currentTime * 100;

	// Display the result in a message box
	CString summary;
	summary.Format(_T("\nAverage Waiting Time: %.2f\nTurnaround Time: %.2f\nCPU Utilization: %.2f%%\n"),
		averageWaitingTime, averageTurnaroundTime, cpuUtilization);
	AfxMessageBox(result + summary);

	// Step 5: Update the List Control's completion times based on the sorted processes
	for (int i = 0; i < nItems; i++) {
		// Get the Process ID from the List Control (column 0)
		strTemp = pListCtrl->GetItemText(i, 0);
		int listProcessID = _ttoi(strTemp.Mid(1));  // Remove 'P' prefix

		// Find the corresponding process in the sorted list
		for (const auto& proc : processes) {
			if (proc.processID == listProcessID) {
				// Update the List Control with the correct completion time (column 4)
				CString strCompletionTime;
				strCompletionTime.Format(_T("%d"), proc.completionTime);
				pListCtrl->SetItemText(i, 4, strCompletionTime);  // Column index 4 for Completion Time
				break;
			}
		}
	}

	// Step 6: Set each value in its designated control (for UI display)
	CString strAvgWaitingTime, strAvgTurnaroundTime, strCpuUtilization;
	strAvgWaitingTime.Format(_T("%.2f"), averageWaitingTime);
	strAvgTurnaroundTime.Format(_T("%.2f"), averageTurnaroundTime);
	strCpuUtilization.Format(_T("%.2f%%"), cpuUtilization);

	SetDlgItemText(IDC_EDIT2_Waiting, strAvgWaitingTime);       // Average waiting time
	SetDlgItemText(IDC_EDIT3_Turnaround, strAvgTurnaroundTime); // Average turnaround time
	SetDlgItemText(IDC_EDIT4_Completion, strCpuUtilization);    // CPU utilization
}

void CCPUSchedulingAppDlg::OnBnClickedButton7Sjn()
{
	CListCtrl* pListCtrl = (CListCtrl*)GetDlgItem(IDC_LIST1);
	int nItems = pListCtrl->GetItemCount();

	if (nItems == 0) {
		AfxMessageBox(_T("No processes available for scheduling!"));
		return;
	}

	std::vector<Process> processes;
	CString strTemp;

	// Step 1: Extract the original process data from the list control
	

		for (int i = 0; i < nItems; i++) {
			Process proc;
			strTemp = pListCtrl->GetItemText(i, 0); // Get Process ID from the list control
			proc.processID = _ttoi(strTemp.Mid(1));


		strTemp = pListCtrl->GetItemText(i, 1);
		proc.arrivalTime = _ttoi(strTemp);

		strTemp = pListCtrl->GetItemText(i, 2);
		proc.burstTime = _ttoi(strTemp);

		processes.push_back(proc);
	}

	// Step 2: Sort processes by arrival time first, then by burst time (SJN)
	std::sort(processes.begin(), processes.end(), [](const Process& a, const Process& b) {
		if (a.arrivalTime == b.arrivalTime) {
			return a.burstTime < b.burstTime;
		}
		return a.arrivalTime < b.arrivalTime;
		});

	int currentTime = 0;
	int totalWaitingTime = 0;
	int totalTurnaroundTime = 0;

	CString result = _T("SJN Scheduling Order:\n\n");

	for (auto& proc : processes) {
		if (currentTime < proc.arrivalTime) {
			currentTime = proc.arrivalTime;
		}

		proc.AvgWaitingTime = currentTime - proc.arrivalTime;
		proc.completionTime = currentTime + proc.burstTime;
		proc.turnaroundTime = proc.completionTime - proc.arrivalTime;

		totalWaitingTime += proc.AvgWaitingTime;
		totalTurnaroundTime += proc.turnaroundTime;

		CString strExec;
		strExec.Format(_T("Process P%d: Arrival Time: %d, Burst Time: %d, Completion Time: %d\n"),
			proc.processID, proc.arrivalTime, proc.burstTime, proc.completionTime);
		result += strExec;

		currentTime += proc.burstTime;
	}

	// Calculate averages and CPU utilization
	int totalBurstTime = 0;
	for (const auto& proc : processes) {
		totalBurstTime += proc.burstTime;
	}

	float averageWaitingTime = static_cast<float>(totalWaitingTime) / nItems;
	float averageTurnaroundTime = static_cast<float>(totalTurnaroundTime) / nItems;
	float cpuUtilization = static_cast<float>(totalBurstTime) / currentTime * 100;

	// Display the result in a message box
	CString summary;
	summary.Format(_T("\nAverage Waiting Time: %.2f\nAverage Turnaround Time: %.2f\nCPU Utilization: %.2f%%\n"),
		averageWaitingTime, averageTurnaroundTime, cpuUtilization);
	AfxMessageBox(result + summary);

	
	// Set each value in its designated control (for UI display)
	CString strAvgWaitingTime, strAvgTurnaroundTime, strCpuUtilization;
	strAvgWaitingTime.Format(_T("%.2f"), averageWaitingTime);
	strAvgTurnaroundTime.Format(_T("%.2f"), averageTurnaroundTime);
	strCpuUtilization.Format(_T("%.2f%%"), cpuUtilization);

	SetDlgItemText(IDC_EDIT2_Waiting, strAvgWaitingTime);       // Average waiting time
	SetDlgItemText(IDC_EDIT3_Turnaround, strAvgTurnaroundTime); // Average turnaround time
	SetDlgItemText(IDC_EDIT4_Completion, strCpuUtilization);    // CPU utilization

	for (int i = 0; i < nItems; i++) {
		// Get the Process ID from the List Control (column 0)
		strTemp = pListCtrl->GetItemText(i, 0);
		int listProcessID = _ttoi(strTemp.Mid(1));  // Remove 'P' prefix

		// Find the corresponding process in the sorted list
		for (const auto& proc : processes) {
			if (proc.processID == listProcessID) {
				// Update the List Control with the correct completion time (column 4)
				CString strCompletionTime;
				strCompletionTime.Format(_T("%d"), proc.completionTime);
				pListCtrl->SetItemText(i, 4, strCompletionTime);  // Column index 4 for Completion Time
				break;
			}
		}
	}
}



void CCPUSchedulingAppDlg::OnBnClickedButton11Clear()
{
	// TODO: Add your control notification handler code here
	
		// Clear the list control
		CListCtrl* pListCtrl = (CListCtrl*)GetDlgItem(IDC_LIST1);
		if (pListCtrl != nullptr)
		{
			pListCtrl->DeleteAllItems();  // Remove all items from the list control
		}

		// Reset input fields (Arrival Time, Burst Time, Priority) to their default values
		SetDlgItemInt(IDC_EDIT5, 0);  // Reset Arrival Time to 0
		SetDlgItemInt(IDC_EDIT6, 0);  // Reset Burst Time to 0
		SetDlgItemInt(IDC_EDIT7, 0);  // Reset Priority to 0

		// Optionally, display a confirmation message
		AfxMessageBox(_T("All data has been cleared."));
	

}






void CCPUSchedulingAppDlg::OnBnClickedButton2Sjfpreemptive()
{
	// TODO: Add your control notification handler code here
	
		CListCtrl* pListCtrl = (CListCtrl*)GetDlgItem(IDC_LIST1);
		int nItems = pListCtrl->GetItemCount();

		if (nItems == 0) {
			AfxMessageBox(_T("No processes available for scheduling!"));
			return;
		}

		std::vector<Process> processes;
		CString strTemp;

		// Step 1: Extract the original process data from the list control
		for (int i = 0; i < nItems; i++) {
			Process proc;
			strTemp = pListCtrl->GetItemText(i, 0); // Get Process ID from the list control
			proc.processID = _ttoi(strTemp.Mid(1)); // Remove 'P' prefix

			strTemp = pListCtrl->GetItemText(i, 1);
			proc.arrivalTime = _ttoi(strTemp);

			strTemp = pListCtrl->GetItemText(i, 2);
			proc.burstTime = _ttoi(strTemp);

			proc.remainingBurstTime = proc.burstTime; // Initialize remaining burst time

			processes.push_back(proc);
		}

		int currentTime = 0;
		int totalWaitingTime = 0;
		int totalTurnaroundTime = 0;
		int completedProcesses = 0;
		int shortestRemainingTime;
		bool foundProcess;

		CString result = _T("SRTF Scheduling Order:\n\n");

		while (completedProcesses < nItems) {
			shortestRemainingTime = INT_MAX;
			foundProcess = false;
			int selectedIndex = -1;

			// Step 2: Find process with the shortest remaining time that has arrived
			for (int i = 0; i < nItems; i++) {
				if (processes[i].arrivalTime <= currentTime && processes[i].remainingBurstTime > 0) {
					if (processes[i].remainingBurstTime < shortestRemainingTime) {
						shortestRemainingTime = processes[i].remainingBurstTime;
						selectedIndex = i;
						foundProcess = true;
					}
				}
			}

			if (!foundProcess) {
				currentTime++;
				continue;
			}

			// Step 3: Execute the process for 1 unit of time
			processes[selectedIndex].remainingBurstTime--;
			currentTime++;

			if (processes[selectedIndex].remainingBurstTime == 0) { // Process completed
				completedProcesses++;
				processes[selectedIndex].completionTime = currentTime;
				processes[selectedIndex].turnaroundTime = processes[selectedIndex].completionTime - processes[selectedIndex].arrivalTime;
				processes[selectedIndex].waitingTime = processes[selectedIndex].turnaroundTime - processes[selectedIndex].burstTime;

				totalWaitingTime += processes[selectedIndex].waitingTime;
				totalTurnaroundTime += processes[selectedIndex].turnaroundTime;

				CString strExec;
				strExec.Format(_T("Process P%d: Arrival Time: %d, Burst Time: %d, Completion Time: %d\n"),
					processes[selectedIndex].processID, processes[selectedIndex].arrivalTime, processes[selectedIndex].burstTime, processes[selectedIndex].completionTime);
				result += strExec;
			}
		}

		// Step 4: Calculate averages and CPU utilization
		float averageWaitingTime = static_cast<float>(totalWaitingTime) / nItems;
		float averageTurnaroundTime = static_cast<float>(totalTurnaroundTime) / nItems;
		int totalBurstTime = totalTurnaroundTime - totalWaitingTime;  // Alternatively, sum all burst times
		float cpuUtilization = static_cast<float>(totalBurstTime) / currentTime * 100;

		// Display the result in a message box
		CString summary;
		summary.Format(_T("\nAverage Waiting Time: %.2f\nAverage Turnaround Time: %.2f\nCPU Utilization: %.2f%%\n"),
			averageWaitingTime, averageTurnaroundTime, cpuUtilization);
		AfxMessageBox(result + summary);

		// Set each value in its designated control (for UI display)
		CString strAvgWaitingTime, strAvgTurnaroundTime, strCpuUtilization;
		strAvgWaitingTime.Format(_T("%.2f"), averageWaitingTime);
		strAvgTurnaroundTime.Format(_T("%.2f"), averageTurnaroundTime);
		strCpuUtilization.Format(_T("%.2f%%"), cpuUtilization);

		SetDlgItemText(IDC_EDIT2_Waiting, strAvgWaitingTime);       // Average waiting time
		SetDlgItemText(IDC_EDIT3_Turnaround, strAvgTurnaroundTime); // Average turnaround time
		SetDlgItemText(IDC_EDIT4_Completion, strCpuUtilization);    // CPU utilization

		for (int i = 0; i < nItems; i++) {
			// Get the Process ID from the List Control (column 0)
			strTemp = pListCtrl->GetItemText(i, 0);
			int listProcessID = _ttoi(strTemp.Mid(1));  // Remove 'P' prefix

			// Find the corresponding process in the list
			for (const auto& proc : processes) {
				if (proc.processID == listProcessID) {
					// Update the List Control with the correct completion time (column 4)
					CString strCompletionTime;
					strCompletionTime.Format(_T("%d"), proc.completionTime);
					pListCtrl->SetItemText(i, 4, strCompletionTime);  // Column index 4 for Completion Time
					break;
				}
			}
		}
	}





	






	
