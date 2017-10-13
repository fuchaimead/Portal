course_name = ['Winter', 'Spring', 'Summer', 'Fall']
course_type = ['Full-Time', 'Part-Time']

10.times do 
  @course = Course.create(
    course_type: course_name.sample,
    term: course_type.sample,
    year: 2017
  )
    10.times do |i|   
      section = Section.create(
        title: "Week #{i + 1}",
        course_id: @course.id
      )
        10.times do |i|
          group = Group.create(
            title: "Day #{i + 1}",
            section_id: section.id
          )
            5.times do |i|
              lecture = Lecture.create(
                title: "Lecture #{i + 1}", 
                content: "<h1><strong>This is a content page for lecture #{i + 1}. </strong></h1><p>Lecture #{i + 1} content. More content. Even more content.</p><p><br></p><ul><li>Lecture #{i + 1} bullet.</li><li>Lecture #{i + 1} bullet.</li><li>Lecture #{i + 1} bullet.</li><li><br></li></ul>",
                group_id: group.id
              )
            end
        end
    end
end

puts "10 courses seeded"
puts "10 sections seeded" 
puts "10 groups seeded"
puts "5 lectures seeded"

admin = User.create(
  first_name: 'admin',
  last_name: 'admin',
  email: 'admin@admin.com',
  password: 'password',
  is_admin: true
)

1.times do 
  student = User.create(
    first_name: 'student',
    last_name: 'student',
    email: 'test@test.com',
    password: 'password',
    is_admin: false
  )
    Enrollment.create(
      role: 'student',
      sub_role: Faker::Company.bs,
      user_id: student.id,
      course_id: 1
    )
end

puts "Test Admin seeded email: admin@admin.com and password: password"
puts "Test Student seeded email: test@test.com and password: password"

20.times do 
  student = User.create(
    email: Faker::Internet.email,
    password: 'password',
    first_name: Faker::Name.first_name,
    last_name: Faker::Name.last_name,
    invitation_accepted_at: Time.now
  )
    Enrollment.create(
      role: 'student',
      sub_role: Faker::Company.bs,
      user_id: student.id,
      course_id: @course.id
    )
end

puts "20 students seeded with enrollment."