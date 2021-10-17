import { Layout, Menu } from 'antd';

export const SiderBar = props => {

    return (
        <Layout.Sider width={200}>
            <Menu
                mode="inline"
                style={{ height: "100%", borderRight: 0 }}
            >
                {
                    props.createmenuitems
                }
            </Menu>
        </Layout.Sider>
    )
}