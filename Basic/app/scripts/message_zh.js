'use strict';
/**
 * Resource file for en g18n
 */

angular.module('basic').config(['$translateProvider', function ($translateProvider) {
        $translateProvider.translations('zh', {
                //Common

                'web_menu_change_lang' : 'Change to English',

                'web_menu_full_screen' : '全屏模式',
                'web_menu_exit_full_screen' : '正常模式',

                'web_menu_realtime': '實時監控',
                'web_menu_register': '登記人仕',
                'web_menu_capture': '監控記錄',
                'web_menu_setting': '設置',

                'web_common_search': '搜尋',
                'web_common_add': '新增',
                'web_common_update': '更新',
                'web_common_edit': '更新',
                'web_common_delete': '刪除',
                'web_common_save': '保存',
                'web_common_cancel': '取消',
                'web_common_upload': '上載',
                'web_common_filter': '過濾',
                'web_common_reset': '重設',
                'web_common_close': '關閉',

                'web_common_all': '全部',
                'web_common_high': '高',
                'web_common_mid': '中',
                'web_common_low': '低',

                'web_common_status': '狀態',
                'web_common_active': '正常',
                'web_common_disable': '停用',
                'web_common_fail': '異常',
                'web_common_active_use': '啟用',
                'web_common_inactive_use': '停用',

                'web_common_message': '信息',

                'web_common_name': '名稱',
                'web_common_cap_date': '最後記錄日期',
                'web_common_cap_location': '最後記錄位置',
                'web_common_id': '號碼',
                'web_common_altname': '其他名稱',
                'web_common_sex': '性別',
                'web_common_nationality': '國籍',
                'web_common_photo': '照片',
                'web_common_remark': '備註',
                'web_common_register_date': '登記日期',
                'web_common_date': '日期',
                'web_common_location': '位置',
                'web_common_camera': '監控鏡',
                'web_common_similarity': '相似度',
                'web_common_time': '時間',

                'web_common_register': '己登記人仕',
                'web_common_non_register': '未登記人仕',

                //Login Page
                'web_login_signin': '登入',
                'web_login_login': '帳號',
                'web_login_password': '密碼',
                'web_login_fogot': '忘記密碼?',
                'web_login_valmsg_login': '請輸入帳號',
                'web_login_valmsg_pass': '請輸入密碼',

                'web_login_valmsg_nouser': '没有這個帳號',
                'web_login_valmsg_wrongpass': '密碼錯誤',

                //Real Time Page
                'web_rt_live_stream': '實時監控',
                'web_rt_register': '己登記人仕',
                'web_rt_non_register': '未登記人仕',
                'web_rt_camera': '監控鏡:',
                'web_rt_Location': '位置:',

                'web_rt_reg_name': '名稱',
                'web_rt_reg_altname': '其他名稱',
                'web_rt_reg_time': '監控時間',
                'web_rt_reg_location': '監控位置',
                'web_rt_reg_short_time': '時間',
                'web_rt_reg_short_location': '位置',

                //Register People
                'web_reg_search_title': '搜索己登記人仕',
                'web_reg_title': '登記人仕',

                //Capture History
                'web_hist_incl_non_reg': '包含未登記人仕',
                'web_hist_captured_img': '記錄圖像',
                'web_hist_show_img': '顯示圖像',

                //Setting
                'web_sett_menu_sys': '系統設定',
                'web_sett_menu_cam_server': '監控鏡處理伺服器設定',
                'web_sett_menu_user_mgnt': '用戶管理',
                'web_sett_menu_user_add': '新增用戶',
                'web_sett_menu_user_search': '搜尋用戶',
                'web_sett_menu_cam': '監控鏡設定',
                'web_sett_menu_cam_add': '新增監控鏡',

                'web_sett_img_server': '監控鏡處理伺服器',

                'web_sett_sys_similarity': '相似度 (%)',
                'web_sett_sys_note_1': '注意: 圖像相似度低於',
                'web_sett_sys_note_2': '% 將會當成未登記人仕',

                'web_sett_sys_ser_dbname': '資料庫名稱',
                'web_sett_sys_ser_dbnote': '注意:更改資料庫名稱須重設監控鏡處理伺服器',
                'web_sett_sys_ser_conn': '監控鏡處理伺服器連接地址',
                'web_sett_sys_ser_conn_note': '格式: [IP 地址]:[端口]',
                'web_sett_sys_ser_reset': '重設監控鏡處理伺服器',
                'web_sett_sys_ser_reset_note': '注意:重設監控鏡處理伺服器將會清空資料庫。重設過程所有監控功能會完全停止',
                'web_sett_sys_ser_test_conn': '測試伺服器連接',

                'web_sett_cam_add_title': '新增監控鏡',
                'web_sett_cam_edit_title': '更新監控鏡',
                'web_sett_cam_name': '監控鏡名稱',
                'web_sett_cam_rtsp': 'RTSP 地址',

                //Setting - User
                'web_sett_user_title_add': '新增用戶',
                'web_sett_user_title_edit': '更改用戶',

                'web_sett_user_name': '用戶名稱',
                'web_sett_user_role': '用戶權限',

                'web_sett_user_pw': '密碼',
                'web_sett_user_pw_conf': '確認密碼',
                'web_sett_user_role_superadmin': '系統管理員',
                'web_sett_user_role_admin': '管理員',
                'web_sett_user_role_user': '用戶',

                'web_sett_user_valmsg_pw': '確認密碼不相同'

        });
}]);