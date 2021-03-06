import React from 'react'
import { Redirect,Route,Switch } from 'react-router-dom'
import { connect } from 'react-redux'
import { Layout } from 'antd';
import './css/admin.less'
import {createDeleteUserInfoAction} from '../../redux/action_creators/login_action'
import Header from './header/header.jsx'
import Home from '../../components/home/home'
import Category from '../category/category'
import Product from '../product/product'
import User from '../user/user'
import Role from '../role/role'
import Bar from '../bar/bar'
import Line from '../line/line'
import Pie from '../pie/pie'
import AddUpdate from '../product/add_update'
import Detail from '../product/detail'
import { reqCategoryList } from '../../api';
import LeftNav from './left_nav/left_nav'

class Admin extends React.Component {
 //商品分类请求
  Category=async() => {
    let result =await reqCategoryList()
    console.log(result);
  }
  render() {
    const { Footer, Sider, Content } = Layout;
    const { isLogin } = this.props.userInfo
    if (!isLogin) {
      return <Redirect to='/login' />
    } else {
      return (
        <Layout className='admin'>
          <Sider className='sider'><LeftNav/></Sider>
          <Layout>
            <Header></Header>
            <Content className='content'>
              <Switch>
                <Route path='/admin/home' component={Home}/>
                <Route path='/admin/prod_about/category' component={Category}/>
                <Route path='/admin/prod_about/product' component={Product} exact/>
                <Route path='/admin/prod_about/product/detail/:id' component={Detail}/>
                <Route path='/admin/prod_about/product/add_update' component={AddUpdate} exact/>
                <Route path='/admin/prod_about/product/add_update/:id' component={AddUpdate}/>
                <Route path='/admin/user' component={User}/>
                <Route path='/admin/role' component={Role}/>
                <Route path='/admin/charts/bar' component={Bar}/>
                <Route path='/admin/charts/line' component={Line}/>
                <Route path='/admin/charts/pie' component={Pie}/>
                <Redirect to='/admin/home'/>
              </Switch>
            </Content>
            <Footer className='footer'>推荐使用谷歌浏览器, 可以获得更佳页面操作体验!<button onClick={this.Category}>点我</button></Footer>
          </Layout>
        </Layout>
      )
    }
  }
}
export default connect(
  state => ({ userInfo: state.userInfo }),
  {
    deleteUserInfo: createDeleteUserInfoAction
  }
)(Admin)