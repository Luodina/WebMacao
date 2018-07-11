'use strict';
/**
 * Resource file for en g18n
 */

angular.module('basic').config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('en', {
                //Common
                'web_menu_change_lang' : '轉換成中文',

                'web_menu_full_screen' : 'Full Screen',
                'web_menu_exit_full_screen' : 'Exit Full Screen',

                'web_menu_realtime': 'Real Time Monitoring',
                'web_menu_register': 'Registered People',
                'web_menu_capture': 'Capture History',
                'web_menu_setting': 'Setting',

                'web_common_search': 'Search',
                'web_common_add': 'Add',
                'web_common_update': 'Update',
                'web_common_edit': 'Edit',
                'web_common_delete': 'Delete',
                'web_common_save': 'Save',
                'web_common_cancel': 'Cancel',
                'web_common_upload': 'Upload',
                'web_common_filter': 'Filter',
                'web_common_reset': 'Reset',
                'web_common_close': 'Close',

                'web_common_all': 'All',
                'web_common_high': 'High',
                'web_common_mid': 'Medium',
                'web_common_low': 'Low',

                'web_common_status': 'Status',
                'web_common_active': 'Active',
                'web_common_disable': 'Disable',
                'web_common_fail': 'Fail',
                'web_common_active_use': 'Active',
                'web_common_inactive_use': 'Inactive',

                'web_common_message': 'Message',

                'web_common_name': 'Name',
                'web_common_cap_date': 'Last Captured Date',
                'web_common_cap_location': 'Last Captured Location',
                'web_common_id': 'ID',
                'web_common_altname': 'Alternative Name',
                'web_common_sex': 'Sex',
                'web_common_nationality': 'Nationality',
                'web_common_photo': 'Photo',
                'web_common_remark': 'Remark',
                'web_common_register_date': 'Register Date',
                'web_common_date': 'Date',
                'web_common_location': 'Location',
                'web_common_camera': 'Camera',
                'web_common_similarity': 'Similarity',
                'web_common_time': 'Time',
                'web_common_register': 'Registered',
                'web_common_non_register': 'Non-Registered',

                //Login Page
                'web_login_signin': 'Sing In',
                'web_login_login': 'Login',
                'web_login_password': 'Password',
                'web_login_fogot': 'Forgot your password?',
                'web_login_valmsg_login': 'Username can not be empty',
                'web_login_valmsg_pass': 'Password can not be blank',

                'web_login_valmsg_nouser': 'Username not found',
                'web_login_valmsg_wrongpass': 'Invalid password',

                //Real Time Page
                'web_rt_live_stream': 'Live Stream',
                'web_rt_register': 'Registered',
                'web_rt_non_register': 'Non-Registered',
                'web_rt_camera': 'Camera:',
                'web_rt_Location': 'Location:',

                'web_rt_reg_name': 'Name',
                'web_rt_reg_altname': 'AltName',
                'web_rt_reg_time': 'Time',
                'web_rt_reg_location': 'Location',
                'web_rt_reg_short_time': 'Time',
                'web_rt_reg_short_location': 'Location',

                //Register People
                'web_reg_search_title': 'Search Registered People',
                'web_reg_title': 'Register a People',

                //Capture History
                'web_hist_incl_non_reg': 'Include Non-Registered People',
                'web_hist_captured_img': 'Captured Image',
                'web_hist_show_img': 'Show Image',

                //Setting - Menu
                'web_sett_menu_sys': 'System Setting',
                'web_sett_menu_cam_server': 'Camera Processing Server Setting',
                'web_sett_menu_user_mgnt': 'User Management',
                'web_sett_menu_user_add': 'Add User',
                'web_sett_menu_user_search': 'Search User',
                'web_sett_menu_cam': 'Camera Setting',
                'web_sett_menu_cam_add': 'Add Camera',

                //Setting - System
                'web_sett_img_server': 'Camera Processing Server',

                'web_sett_sys_similarity': 'Similarity Level (%)',
                'web_sett_sys_note_1': 'Note: Similarity lower than',
                'web_sett_sys_note_2': '% will consider as non-Registered People',

                'web_sett_sys_ser_dbname': 'Database Name',
                'web_sett_sys_ser_dbnote': 'Need to Re-initialise senseServer after changing the database name.',
                'web_sett_sys_ser_conn': 'Camera Processing Server Connection URL',
                'web_sett_sys_ser_conn_note': 'Format: [IP]:[Port]',
                'web_sett_sys_ser_reset': 'Initialisation SenseServer',
                'web_sett_sys_ser_reset_note': 'Causion: This function will empty senseServer database. All registered people and camera setting will be reconfigure to senseServer and all service will be suspended. ',
                'web_sett_sys_ser_test_conn': 'Test Connection',

                //Setting - Camera
                'web_sett_cam_add_title': 'Add Camera',
                'web_sett_cam_edit_title': 'Edit Camera',
                'web_sett_cam_name': 'Camera Name',
                'web_sett_cam_rtsp': 'RTSP URL',

                //Setting - User
                'web_sett_user_title_add': 'Add User',
                'web_sett_user_title_edit': 'Edit User',

                'web_sett_user_name': 'User Name',
                'web_sett_user_role': 'User Role',

                'web_sett_user_pw': 'Password',
                'web_sett_user_pw_conf': 'Confirm Password',
                'web_sett_user_role_superadmin': 'Super Admin',
                'web_sett_user_role_admin': 'Admin',
                'web_sett_user_role_user': 'User',

                'web_sett_user_valmsg_pw': 'Confirm Password must be the same as Password!'

        });
}]);