"use client";
"use strict";

import {useState, useEffect, useRef} from 'react';
import Image from "next/image";
import Link from "next/link";
import {useRouter} from "next/navigation";
import {
    MdCreate,
    MdShoppingCart,
    MdContentPaste,
    MdLogout,
    MdPerson,
    MdUploadFile,
    MdEdit,
    MdDelete, MdManageSearch, MdVisibility
} from "react-icons/md";

import Logo from "../../../../public/images/logos/EZ-Laptop-logo.png";

const BASE_API = "http://localhost:3080";

function SearchBar({className, children}) {
    return <div className={" " + className}>
        {children}
    </div>
}

function TabHeader({onClick, className, children, isDisabled}) {
    return <li onClick={onClick}
               className={"md:min-w-[160px] lg:min-w-[200px] border-t-2 md:border-t-0 md:border-b-2 border-r-2 md:border-r-0 rounded-t-lg md:rounded-tr-none md:rounded-bl-lg px-2 md:px-4 lg:px-8 py-1 md:py-4 flex items-center gap-1 " + className}
               disabled={isDisabled}>
        {children}
    </li>
}

function TabMain({children, className}) {
    return <main
        className={"w-full p-2 md:p-4 rounded-tr-lg md:rounded-tl-lg rounded-b-lg bg-white shadow-md " + className}>{children}</main>
}

function OrderSection({children, className, order_data}) {
    const [isEditing, setIsEditing] = useState(false);
    const [order, setOrder] = useState(order_data);
    const [laptopImage, setLaptopImage] = useState(BASE_API + order_data?.Laptop?.Image);
    const [isReading, setIsReading] = useState(false);

    async function updateOrder(formData) {
        try {
            await fetch(`${BASE_API}/order/personal`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    OrderID: order_data._id,
                    Phone: formData.get('Phone'),
                    Receiver: formData.get('Receiver'),
                    Address: formData.get('Address')
                }),
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    setOrder(data);
                    alert("Cập nhật đơn hàng thành công. ^-^");
                });
        } catch (err) {
            console.error(`Can't update order! Error: ${err.message}`);
        }
    }

    return <section className="outline-1 rounded-lg p-2 flex flex-col gap-8">
        {/*overview*/}
        <div>
            <div className="flex items-center gap-2">
                <div className="relative min-w-[48px] md:min-w-[60px] size-[48px] md:size-[60px]">
                    <Image
                        src={laptopImage}
                        alt="Laptop image"
                        fill={true}
                        sizes="(max-width: 768px) 48px, (max-width: 1200px) 60px, 60px"
                        className="object-cover rounded-full"
                    />
                </div>
                <div className='w-full'>
                    <h2 className='font-medium'>{order.Laptop.Name}</h2>
                    <p className="font-bold text-[#80CBC4]">{new Intl.NumberFormat('vi-VN', {
                        style: 'currency',
                        currency: 'VND'
                    }).format(order.Total)}</p>
                </div>
                {/*buttons*/}
                <div className="flex items-center gap-2">
                    <button
                        onClick={() => setIsReading(!isReading)}
                        className="outline-1 rounded-lg md:ml-4 p-2 bg-[#FFB433] text-white cursor-pointer hover:bg-[#80CBC4] hover:text-whtie active:bg-[#B4EBE6] active:text-white">
                        <MdVisibility/></button>
                    {!order_data?.Confirm && <button
                        onClick={() => setIsEditing(!isEditing)}
                        className="outline-1 rounded-lg p-2 bg-[#FFB433] text-white cursor-pointer hover:bg-[#80CBC4] hover:text-whtie active:bg-[#B4EBE6] active:text-white">
                        <MdCreate/></button>}
                    {!order_data?.Confirm && children}
                </div>
            </div>
            <p className="text-end italic underline">{order?.Confirm ?
                <span className='font-medium'>Đã xác nhận</span> : "Chờ xác nhận"}</p>
        </div>

        {
            /*Details*/
            isReading && <ul>
                <li className="flex gap-2">
                    <h3 className='font-medium'>Số điện thoại:</h3>
                    <p>{order.Phone}</p>
                </li>
                <li className="flex gap-2">
                    <h3 className='font-medium'>Người nhận:</h3>
                    <p>{order.Receiver}</p>
                </li>
                <li className="flex gap-2">
                    <h3 className='font-medium'>Địa chỉ:</h3>
                    <p>{order.Address}</p>
                </li>

            </ul>
        }
        {
            /*Edit*/
            isEditing && <form action={updateOrder} className="outline-1 rounded-lg p-2 flex flex-col gap-4">
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label htmlFor='Phone' className="md:min-w-[172px] flex items-center gap-1">Số điện thoại mới:<MdEdit/></label>
                    <input type='tel' id='Phone' name='Phone' className="w-full outline-1 border-none rounded-lg p-2"
                           placeholder="Nhập số điện thoại mới ở đây..."/>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label htmlFor='Receiver' className="min-w-[160px] flex items-center gap-1">Người nhận
                        mới:<MdEdit/></label>
                    <input type='text' id='Receiver' name='Receiver' className="w-full outline-1 border-none rounded-lg p-2"
                           placeholder="Nhập tên người nhận mới ở đây..."/>
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-2">
                    <label htmlFor='Address' className="min-w-[120px] flex items-center gap-1">Địa chỉ mới:<MdEdit/></label>
                    <input type='text' id='Addres' name='Address' className="w-full outline-1 border-none rounded-lg p-2"
                           placeholder="Nhập địa chỉ mới ở đây..."/>
                </div>
                <button type='submit'
                        className="w-max outline-1 rounded-lg px-8 py-2 bg-[#FFB433] font-medium self-center cursor-pointer hover:bg-[#80CBC4] hover:text-[#FBF8EF] active:bg-[#ccc]">Lưu
                </button>
            </form>
        }
    </section>
}

function ProfilePage() {
    const router = useRouter();

    const navRef = useRef(null);
    // ref of info tab
    const newAvatarRef = useRef(null);

    const [isLogout, setIsLogout] = useState(false);
    const [tab, setTab] = useState('InfoTab');
    // state of info tab
    const [avatar, setAvatar] = useState("http://localhost:3080/public/images/avatars/EmptyAvatar.png");
    const [user, setUser] = useState({});
    const [isInfoEditing, setIsInfoEditing] = useState(false);
    const [avatarName, setAvatarName] = useState("");
    // state of order tab
    const [orders, setOrders] = useState([]);
    const [searchedOrders, setSearchedOrders] = useState([]);

    async function getUserData() {
        try {
            await fetch(`${BASE_API}/account/personal`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.message) {
                        router.replace('/');
                    } else {
                        setUser(data);
                        setAvatar(BASE_API + data?.Avatar);
                    }
                });
        } catch (err) {
            console.error(`Can't get user data! Error: ${err.message}`);
        }
    }

    async function updateInfo(formData) {
        try {
            const NewEmail = formData.get('Email');
            const NewUsername = formData.get('Username');
            const NewPassword = formData.get('Password');
            if (NewEmail || NewUsername || NewPassword) {
                await fetch(`${BASE_API}/account/own-info`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': "application/json"
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        Email: NewEmail,
                        Username: NewUsername,
                        Password: NewPassword
                    })
                }).then(res => res.json()).then(data => setUser(data));
            }
            if (newAvatarRef.current?.files[0]) {
                formData.append('Avatar', newAvatarRef.current.files[0]);
                await fetch(`${BASE_API}/account/own-avatar`, {
                    method: 'PUT',
                    credentials: 'include',
                    body: formData
                }).then(res => res.json()).then(data => {
                    setUser(data);
                    setAvatar(BASE_API + data.Avatar)
                });
            }
            setIsInfoEditing(!isInfoEditing);
            alert("Cập tài khoản thành công. ^-^");
        } catch (err) {
            console.error(`Can't update info! Error: ${err.message}`);
        }
    }

    async function getAllOrders() {
        try {
            await fetch(`${BASE_API}/order/personal`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    setOrders(data);
                    setSearchedOrders(data);
                });
        } catch (err) {
            console.error(`Can't get all orders! Error: ${err.message}`);
        }
    }

    async function deleteOrder(id) {
        try {
            await fetch(`${BASE_API}/order/personal`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': "application/json"
                },
                body: JSON.stringify({
                    OrderID: id
                }),
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    setOrders(orders.filter(order => order._id !== data._id));
                    setSearchedOrders(searchedOrders.filter(order => order._id !== data._id));
                    alert("Xóa đơn đặt hàng thành công. ^-^");
                })
        } catch (err) {
            console.error(`Can't delete order! Error: ${err}`);
        }
    }

    useEffect(() => {
        getUserData();
        getAllOrders();
    }, [])

    async function handleLogout() {
        try {
            await fetch(`${BASE_API}/account/logout`, {
                credentials: 'include'
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.message) {
                        router.replace('/');
                    }
                });
        } catch (err) {
            console.error(`Can't logout! Error: ${err.message}`);
        }
    }

    function onChangeTab(e) {
        // find selected tab
        const [Index, SelectedTab] = Object.entries(navRef.current.children).find(([key, value]) => value.classList.contains('bg-white'));
        SelectedTab.classList.toggle('bg-white'); //remove old background
        // add new effect for selected tab
        SelectedTab.classList.toggle('bg-[#B4EBE6]');
        SelectedTab.classList.toggle('cursor-pointer');
        SelectedTab.classList.toggle('hover:bg-[#80CBC4]');
        SelectedTab.classList.toggle('active:bg-[#FFB433]');

        //remove effect from current tab
        e.currentTarget.classList.toggle('bg-[#B4EBE6]');
        e.currentTarget.classList.toggle('cursor-pointer');
        e.currentTarget.classList.toggle('hover:bg-[#80CBC4]');
        e.currentTarget.classList.toggle('active:bg-[#FFB433]');
        //add new effect for current tab
        e.currentTarget.classList.toggle('bg-white');
    }

    return <div className="h-screen bg-[#FBF8EF]">
        {/*navigation bar*/}
        <div className="relative p-2 md:px-4 flex bg-[#80CBC4]">
            <div>
                <Link href="/" className='cursor-pointer'>
                    <Image
                        src={Logo}
                        alt="EZ-Laptop logo"
                        priority={true}
                        className="w-[160px] md:w-[200px] h-auto"
                    />
                </Link>
            </div>
            <div className="absolute right-8 md:right-11 w-[48px] md:w-[60px] h-[48px] md:h-[60px]">
                <Image
                    onClick={() => setIsLogout(!isLogout)}
                    src={avatar}
                    alt={user?.Username + "'s avatar"}
                    fill={true}
                    sizes="(max-width: 768px) 48px, (max-width: 1200px) 60px, 60px"
                    className="object-cover rounded-full"
                />
                {isLogout && <button
                    onClick={handleLogout}
                    className="absolute top-[52px] md:top-[64px] -right-[24px] md:-right-[24px] w-max outline-1 p-1 bg-[#FBF8EF] rounded-lg flex items-center gap-1 cursor-pointer hover:bg-black hover:text-white active:bg-[#ccc]">Đăng
                    xuất<MdLogout/></button>}
            </div>
        </div>
        {/*main*/}
        <div className="mx-2 md:mx-4 mt-2 flex flex-col md:flex-row">
            <ul className="flex md:flex-col gap-2 md:gap-4" ref={navRef}>
                <TabHeader onClick={e => {
                    setTab('InfoTab');
                    onChangeTab(e);
                }} className="md:mt-4 bg-white" isDisabled={tab === 'InfoTab'}><MdPerson
                    className='text-lg md:text-xl'/>Thông tin</TabHeader>
                <TabHeader onClick={e => {
                    setTab('CartTab');
                    onChangeTab(e);
                }}
                           className="bg-[#B4EBE6] cursor-pointer hover:bg-[#80CBC4] active:bg-[#FFB433]"
                           isDisabled={tab === 'CartTab'}><MdShoppingCart
                    className='text-lg md:text-xl'/>Giỏ hàng</TabHeader>
                <TabHeader onClick={e => {
                    setTab('OrderTab');
                    onChangeTab(e);
                }}
                           className="bg-[#B4EBE6] cursor-pointer hover:bg-[#80CBC4] active:bg-[#FFB433]"
                           isDisabled={tab === 'OrderTab'}><MdContentPaste
                    className='text-lg md:text-xl'/>Đơn
                    hàng</TabHeader>
            </ul>
            {tab === 'InfoTab' && <TabMain className="flex flex-col gap-4">
                {/*show info part*/}
                <div className="flex items-center gap-2 md:gap-4">
                    {/*avatar*/}
                    <div className="relative w-[60px] h-[60px]">
                        <Image
                            src={avatar}
                            alt={user?.Username + "'s avatar"}
                            fill={true}
                            sizes="(max-width: 768px) 60px, (max-width: 1200px) 60px, 60px"
                            className="object-cover rounded-full"
                        />
                    </div>
                    <div>
                        <h2 className="font-bold text-xl">{user?.Username}</h2>
                        <p className="underline">{user?.Email}</p>
                    </div>
                    <button onClick={() => setIsInfoEditing(!isInfoEditing)}
                            className="outline-1 rounded-lg lg:ml-4 p-2 bg-[#FFB433] text-xl cursor-pointer hover:bg-[#80CBC4] hover:text-white active:bg-[#B4EBE6]">
                        <MdCreate/></button>
                </div>
                {/*edit info part*/}
                {isInfoEditing && <div className="md:w-1/2 flex flex-col gap-4">
                    {/*change avatar*/}
                    <div className="flex flex-col gap-2">
                        <label htmlFor='AvatarInput'
                               className="w-max outline-1 rounded-lg p-2 bg-[#FFB433] flex items-center gap-1 cursor-pointer hover:bg-[#80CBC4] hover:text-white acive:bg-[#B4EBE6]"
                        >Chọn ảnh đại diện mới<MdUploadFile/></label>
                        <input onChange={e => setAvatarName(e.target?.files[0]?.name)} type='file' id='AvatarInput'
                               ref={newAvatarRef}
                               hidden={true}/>
                        {avatarName !== '' && <div className="outline-1 rounded-lg p-2">
                            <h3 className="font-bold">Tệp đã chọn:</h3>
                            <p>{avatarName}</p>
                        </div>}
                    </div>

                    {/*update info*/}
                    <form action={updateInfo} className="flex flex-col gap-4">
                        <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
                            <label htmlFor='Email' className='lg:min-w-[100px]'>Email mới:</label>
                            <input type='Email' id='Email' name='Email'
                                   className="w-full outline-1 border-none rounded-lg p-2"
                                   placeholder="Nhập email mới ở đây..."/>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
                            <label htmlFor='Username' className='lg:min-w-[130px]'>Biệt danh mới:</label>
                            <input type='text' id='Username' name='Username'
                                   className="w-full outline-1 border-none rounded-lg p-2"
                                   placeholder="Nhập biệt danh mới ở đây..."/>
                        </div>
                        <div className="flex flex-col lg:flex-row gap-2 lg:items-center">
                            <label htmlFor='Password' className='min-w-[130px]'>Mật khẩu mới:</label>
                            <input type='password' id='Password' name='Password'
                                   className="w-full outline-1 border-none rounded-lg p-2"
                                   placeholder="Nhập mật khẩu mới ở đây..." minLength={8}
                                   pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$"
                                   title="Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt"/>
                        </div>
                        <button type='submit'
                                className="w-max outline-1 rounded-lg px-8 py-2 bg-[#FFB433] self-center lg:self-start cursor-pointer hover:bg-[#80CBC4] hover:text-white acive:bg-[#B4EBE6]">Lưu
                        </button>
                    </form>
                </div>}
            </TabMain>}
            {tab === 'CartTab' && <TabMain>Giỏ hàng</TabMain>}
            {tab === 'OrderTab' && <TabMain className="flex flex-col gap-4 md:gap-8">
                <SearchBar>
                    <div className="flex items-center gap-2">
                        <label htmlFor='Username' className='text-4xl'><MdManageSearch/></label>
                        <input
                            onChange={e => {
                                if (e.currentTarget.value !== '') {
                                    setSearchedOrders(orders.filter(order => order?.Laptop.Name.toLowerCase().includes(e.currentTarget.value.toLowerCase())))
                                } else {
                                    setSearchedOrders(orders);
                                }
                            }}
                            type='search' id='Username'
                            className="w-full lg:w-1/2 outline-1 border-none rounded-lg p-2"
                            placeholder="Tìm đơn theo tên laptop?"/>
                    </div>
                </SearchBar>
                <div className="flex flex-col lg:grid grid-cols-3 gap-2 md:gap-4">
                    {searchedOrders.map((order, index) => <OrderSection key={index} order_data={order}>
                        <button
                            onClick={() => {
                                deleteOrder(order._id);
                            }}
                            className="outline-1 rounded-lg p-2 bg-[#FFB433] text-white cursor-pointer hover:bg-red-500 active:bg-[#ccc]">
                            <MdDelete/></button>
                    </OrderSection>)}
                </div>
            </TabMain>}
        </div>
    </div>
}

export default ProfilePage;