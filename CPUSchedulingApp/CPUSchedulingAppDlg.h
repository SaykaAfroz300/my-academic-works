
// CPUSchedulingAppDlg.h : header file
//

#pragma once


// CCPUSchedulingAppDlg dialog
class CCPUSchedulingAppDlg : public CDialogEx
{
// Construction
public:
	CCPUSchedulingAppDlg(CWnd* pParent = nullptr);	// standard constructor

// Dialog Data
#ifdef AFX_DESIGN_TIME
	enum { IDD = IDD_CPUSCHEDULINGAPP_DIALOG };
#endif

	protected:
	virtual void DoDataExchange(CDataExchange* pDX);	// DDX/DDV support


// Implementation
protected:
	HICON m_hIcon;

	// Generated message map functions
	virtual BOOL OnInitDialog();
	afx_msg void OnSysCommand(UINT nID, LPARAM lParam);
	afx_msg void OnPaint();
	afx_msg HCURSOR OnQueryDragIcon();
	DECLARE_MESSAGE_MAP()
public:
	afx_msg void OnBnClickedCancel();
	/*afx_msg void OnBnClickedButton3();
	afx_msg void OnBnClickedButton10();*/
	afx_msg void OnLvnItemchangedList1(NMHDR* pNMHDR, LRESULT* pResult);
	int m_ArrivalTime;
	int m_BurstTime;
	int m_Priority;
	afx_msg void OnBnClickedButtonAddProcess();
	afx_msg void OnBnClickedButtonFcfs();
	/*afx_msg void OnBnClickedButton4();*/
	afx_msg void OnBnClickedButton4priority();
	/*afx_msg void OnBnClickedButton7();*/
	/*afx_msg void OnBnClickedButton7Sjf();*/
	afx_msg void OnBnClickedButton7Sjn();
	/*afx_msg void OnBnClickedButton5Roundrobin();*/
	afx_msg void OnBnClickedButton11Clear();
	/*afx_msg void OnEnChangeEdit1Result();*/
	/*afx_msg void OnBnClickedButton2();*/
	afx_msg void OnBnClickedButton2Sjfpreemptive();
	/*afx_msg void OnBnClickedButton1Roundrobin();
	afx_msg void OnBnClickedButton2Roundrobin();
	afx_msg void OnBnClickedButton6roundrobin();
	CButton rr;*/
	
	
};
