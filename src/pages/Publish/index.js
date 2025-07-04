import {
  Card,
  Breadcrumb,
  Form,
  Button,
  Radio,
  Input,
  Upload,
  Space,
  Select
} from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import './index.scss'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useState } from'react'
import { useEffect } from 'react'
import { getChannelsAPI } from'@/apis/article'
import { createArticleAPI } from '@/apis/article'
import { message } from 'antd'



const { Option } = Select
const Publish = () => {
  //获取频道列表
  const [channelList, setChannelList] = useState([])
  useEffect(() => {
    async function getChannelList() {
      const res = await getChannelsAPI()
      setChannelList(res.data.channels)
    }
    getChannelList()
  }, [])
  //表单提交
  const onFinish = (formValues) => {
    const { title, content, channel_id } = formValues
    //校验图片数量是否等于Type数量
    if (imageType > 0 && imageList.length !== imageType) {
      return message.error(`请选择${imageType}张图片`)
    }
    //1.按照接口文档格式处理收集到的数据表单
    const reqData  = { 
      title,
      content,
      cover: {
        type: imageType,
        images: imageList.map(item => item.response.data.url)
      },
      channel_id
    }
    console.log(reqData)
    //2.调用接口
    createArticleAPI(reqData)
  };
  //上传图片
  const [imageList, setImageList] = useState([])
  const onChange = (value) => {
    setImageList(value.fileList)
  }

  // 切换图片封面类型
  const [imageType, setImageType] = useState(0)
  const onTypeChange = (e) => {
    setImageType(Number(e.target.value))
  }

  return (
    <div className="publish">
      <Card
        title={
          <Breadcrumb items={[
            { title: <Link to={'/'}>首页</Link> },
            { title: '发布文章' },
          ]}
          />
        }
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ type: 0 }}
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{ required: true, message: '请输入文章标题' }]}
          >
            <Input placeholder="请输入文章标题" style={{ width: 400 }} />
          </Form.Item>
          <Form.Item
            label="频道"
            name="channel_id"
            rules={[{ required: true, message: '请选择文章频道' }]}
          >
            <Select placeholder="请选择文章频道" style={{ width: 400 }}>
              {/* value属性用户选中之后会自动收集起来作为接口的提交字段 */}
              {channelList.map((item) => (<Option key={item.id} value={item.id}>{item.name}</Option>))}
            </Select>
          </Form.Item>
          <Form.Item label="封面">
            <Form.Item name="type" onChange={onTypeChange}>
                <Radio.Group>
                <Radio value={1}>单图</Radio>
                <Radio value={3}>三图</Radio>
                <Radio value={0}>无图</Radio>
                </Radio.Group>
            </Form.Item>
            {imageType>0&&<Upload
                listType="picture-card"
                showUploadList
                action={'http://geek.itheima.net/v1_0/upload'}
                name='image'
                onChange={onChange}
                maxCount={imageType}
            >
                <div style={{ marginTop: 8 }}>
                <PlusOutlined />
                </div>
            </Upload>}
            
          </Form.Item>
          <Form.Item
            label="内容"
            name="content"
            rules={[{ required: true, message: '请输入文章内容' }]}
          >
          <ReactQuill
            className="publish-quill"
            theme="snow"
            placeholder="请输入文章内容"
          />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 4 }}>
            <Space>
              <Button size="large" type="primary" htmlType="submit">
                发布文章
              </Button>
            </Space>
          </Form.Item>
        </Form>
      </Card>
    </div>
  )
}

export default Publish