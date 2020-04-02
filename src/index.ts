import global from '@mmstudio/global';

/**
 * 下载在线文档并打开
 * @param url [string] 文件路径或id
 */
export default function open_document(url: string) {
	if (!/^https?/i.test(url)) {
		const host = global('host', 'http://127.0.0.1:8889');
		url = `${host}/fsweb/getfile?id=${url}`;
	}
	return new Promise<boolean>((resolve) => {
		wx.downloadFile({
			url,
			success(res) {
				wx.openDocument({
					filePath: res.tempFilePath,
					success() {
						resolve(true);
					},
					fail() {
						resolve(false);
					}
				});
			},
			fail() {
				resolve(false);
			}
		});
	});
}
