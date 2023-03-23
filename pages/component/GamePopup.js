import { useState } from 'react';
import { Input, Button, Image, Modal, Spin, Alert, Upload, Radio } from 'antd';
import axios from 'axios';
const { Search } = Input;

export default function GamePopup({ open, onOk, onCancel, onUpload }) {
    const [searchGameList, setGameList] = useState([]);
    const [gameInfoList, setGameInfoList] = useState([]);
    const [direction, setDirection] = useState(1);
    const [alertText, setAlertText] = useState('');

    const buttonClick = (gameInfo) => {
        if (gameInfo && gameInfo.id) {
            axios.get('/api/getInfoById?id=' + gameInfo.id).then(res => {

                if (res.status === 200 && res.data && res.data.result) {
                    setGameInfoList(res.data.result);
                    // 判断是否没有搜到结果
                    if (res.data.result.length < 1) {
                        setAlertText('没有找到这个游戏对应的封面，请换个游戏~');
                    }
                }
                else {
                    setAlertText('网络好像有点问题');
                }
            });
        }
    }


    const searchLoop = [];
    searchGameList.forEach((game, index) => {
        searchLoop.push(<Button style={{ margin: '2px 3px 2px 0' }} key={index} onClick={() => buttonClick(game)}>{game.name}</Button>);
    });

    const selectImage = (game) => {
        onOk({ ...game, direction });
    };
    const gameLoop = [];
    gameInfoList.forEach((game, index) => {
        gameLoop.push(
            <Image
                key={index}
                width={150}
                style={{ margin: '2px 3px 2px 0' }}
                src={game.url}
                preview={false}
                placeholder={(<Spin size="large"></Spin>)}
                onClick={() => selectImage(game)}
            />
        );
    });


    const onSearch = (data) => {
        setAlertText('');
        setGameInfoList([]);
        axios.get('/api/searchGame?game=' + data).then(res => {
            if (res.status === 200 && res.data && res.data.result) {
                setGameList(res.data.result);

                // 判断是否没有搜到结果
                if (res.data.result.length < 1) {
                    setAlertText('没有搜索该游戏，请换个名字再试试。');
                }
            }
            else {
                setAlertText('网络好像有点问题');
            }
        });
    }

    let alertNode = alertText ? (<Alert style={{ margin: '10px 0' }} message={alertText} type="warning" showIcon />) : (<div></div>);


    const getBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    const handlePreview = (file) => {

    }
    const handleChange = (file) => {
        getBase64(file.file.originFileObj).then(res => {
            onUpload({ url: res, direction });
        })
    }

    const onChange = (e) => {
        setDirection(e.target.value);
    }


    return (
        <>
            <Modal title="上传or查询游戏图片"
                footer={null}
                open={open}
                onOk={onOk}
                onCancel={onCancel}>
                <Radio.Group onChange={onChange} value={direction}>
                    <Radio value={1}>竖向</Radio>
                    <Radio value={2}>横向</Radio>
                </Radio.Group>
                <br />
                <Upload
                    onPreview={handlePreview}
                    onChange={handleChange}>
                    <Button>点击我上传图片</Button>
                </Upload>
                <br />
                <Search
                    width={300}
                    allowClear
                    placeholder='请输入你要查询的游戏名(英文)'
                    onSearch={onSearch}>
                </Search>
                <Alert style={{ margin: '10px 0' }} message="在上面的输入框输入你想搜的游戏名搜索。点击下方出现的游戏名，即可选择该游戏封面。" type="info" showIcon />
                {alertNode}
                <div>
                    {searchLoop}
                </div>
                <div>
                    {gameLoop}
                </div>
            </Modal>
        </>
    )
}