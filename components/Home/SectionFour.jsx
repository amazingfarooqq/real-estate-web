import React from 'react'
import { AiFillStar, AiOutlineStar } from 'react-icons/ai'
import styles from "../../styles/Home.module.css"
import Image from 'next/image'

export const SectionFour = () => {
  return (
    <div className={`container-fluid ${styles.sectionFour}`}>
        <div className="row p-5 box" >
            <div className="col-12 text-center text-dark"> <h2>Customers Stories</h2> </div>

            <div className="col-12">

                <div className="row mt-5 view justify-content-center">

                    <div className="col-12 col-lg-4 ">
                        <div className='bg-light  py-4 my-1'>
                        <div className='p-3 px-5' style={{display: 'flex' , alignItems: 'center'}}> 
                        <Image  className={styles.avatar} src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""  />
                          <div className='px-2'>
                            <h3 className='p-0 m-0'>Farooq</h3>
                            <p className='p-0 m-0'>Lorem ipsum dolor</p>
                          </div>
                        </div>
                            <p className='px-5'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio ratione sit animi beatae ex dolorum aperiam voluptas amet nisi non.</p>

                        <div className="px-5">
                            <AiFillStar className="fs-4"/><AiFillStar className="fs-4"/><AiFillStar className="fs-4"/><AiFillStar className="fs-4"/><AiFillStar className="fs-4"/>
                        </div>
                        </div>
                    </div> 

                    <div className="col-12 col-lg-4 ">
                        <div className='bg-light  py-4 my-1'>
                        <div className='p-3 px-5' style={{display: 'flex' , alignItems: 'center'}}> 
                        <Image className={styles.avatar} src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt=""  />
                          <div className='px-2'>
                            <h3 className='p-0 m-0'>Farooq</h3>
                            <p className='p-0 m-0'>Lorem ipsum dolor</p>
                          </div>
                        </div>
                            <p className='px-5'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio ratione sit animi beatae ex dolorum aperiam voluptas amet nisi non.</p>

                            <div className="px-5">
                                <AiFillStar className="fs-4"/><AiFillStar className="fs-4"/><AiFillStar className="fs-4"/><AiFillStar className="fs-4"/><AiFillStar className="fs-4"/>
                            </div>
                        </div>

                        

                    </div> 

                    <div className="col-12 col-lg-4 ">
                        <div className='bg-light  py-4 my-1'>
                        <div className='p-3 px-5' style={{display: 'flex' , alignItems: 'center'}}> 
                        <Image className={styles.avatar} src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt="" />
                          <div className='px-2'>
                            <h3 className='p-0 m-0'>Farooq</h3>
                            <p className='p-0 m-0'>Lorem ipsum dolor</p>
                          </div>
                        </div>
                            <p className='px-5'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio ratione sit animi beatae ex dolorum aperiam voluptas amet nisi non.</p>

                            <div className="px-5">
                                <AiFillStar className="fs-4"/><AiFillStar className="fs-4"/><AiFillStar className="fs-4"/><AiFillStar className="fs-4"/><AiOutlineStar className="fs-4"/>
                            </div>

                        </div>

                       

                    </div> 
             
                </div>
            </div>
        </div>
    </div>
  )
}
